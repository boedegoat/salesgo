import { useRouter } from "next/router";
import { useMemo } from "react";

import { pages } from "@/constants/cms";

const getNormalizedUrl = (url: string) => {
    return !url.startsWith("/") ? "/" + url : url;
};

interface CurrentCMSPage extends CMSPage {
    root?: string;
}

const useCMSPage = () => {
    const router = useRouter();
    const { asPath: url } = router;
    const normalizedUrl = getNormalizedUrl(url.replace("/cms", ""));

    // get current page data
    const page: CurrentCMSPage = useMemo(() => {
        const splittedUrls = normalizedUrl
            .split("/")
            .filter((u) => u)
            .map((u) => "/" + u);

        // if splittedUrls = [], it means user is on home page
        if (splittedUrls.length === 0) {
            return pages[0];
        }

        const [root, nested] = splittedUrls;
        const data = pages.find((p) => p.href === root)!;

        // if current page has nested pages, then return page data from there
        if (data.pages) {
            const nestedData = !nested
                ? data.pages[0]
                : data.pages.find((p) => p.href === nested)!;

            // I add root field to tell that this page has root page
            return { ...nestedData, root: root };
        }

        return data;
    }, []);

    // if page data has root page, get all nested pages
    const nestedPages = useMemo(() => {
        if (!page.root) return undefined;
        return pages.find((p) => p.href === page.root)!.pages;
    }, []);

    return { page, nestedPages };
};

export default useCMSPage;
