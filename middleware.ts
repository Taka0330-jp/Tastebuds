// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
    // middleware内では request ごとに response を作って、cookie を反映させます
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {

                        request.cookies.set(name, value,);
                    });

                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });

                    cookiesToSet.forEach(({ name, value, options }) => {
                        response.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    const { data } = await supabase.auth.getUser();
    const user = data.user;


    if (!user) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";

        url.searchParams.set("next", request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    return response;
}

export const config = {
    matcher: ["/admin/:path*"],
};
