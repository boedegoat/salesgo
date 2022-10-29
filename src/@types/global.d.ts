/* eslint-disable no-unused-vars */

type CustomObject = { [field: string]: any };

type Page = {
    href: string;
    label: string;
    icon: any;
    activeIcon: any;
};

interface CMSPage extends Page {
    pages?: Page[];
}
