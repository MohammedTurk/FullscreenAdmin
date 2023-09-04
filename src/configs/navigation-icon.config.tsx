import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineViewGridAdd,
    HiOutlineHome,
    HiOutlineBookOpen,
    HiOutlineUserGroup,
    HiOutlineDocumentText,
    HiInbox,
    HiViewGrid,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    singleMenu: <HiOutlineViewGridAdd />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    articles: <HiOutlineBookOpen />,
    jobs: <HiOutlineDocumentText />,
    testimonials: <HiOutlineUserGroup />,
    packages: <HiInbox />,
    projects: <HiViewGrid />,
}

export default navigationIcon
