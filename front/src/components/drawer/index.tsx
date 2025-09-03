import { SlDrawer } from 'react-icons/sl'
import { FaPlusCircle } from 'react-icons/fa'
import Link from 'next/link'
import { localRoutes } from '@/utils/constants/endpoints'

export const Drawer = () => {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label
                    htmlFor="my-drawer"
                    className="btn btn-primary drawer-button p-2  rounded-xs"
                >
                    <SlDrawer />
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <li>
                        <Link href={localRoutes.newFeed}>
                            <FaPlusCircle /> Add a feed
                        </Link>
                    </li>
                    <li>
                        <a>Sidebar Item 2</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
