import MainPage from "../pages/index.jsx";
import AdminPage from "../components/AdminComponents/AdminPage/index.jsx";
import NotFound from "../pages/UserPages/Not Found/NotFound.jsx";
import Contact from "../pages/UserPages/Contact/index.jsx";
// import Services from "../pages/UserPages/Services/index.jsx";
import AboutUs from "../pages/UserPages/AboutUs/index.jsx";
import AdminLogin from "../pages/AdminPages/AdminLogin/index.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import ServiceDetail from "../pages/UserPages/ServiceDetail/index.jsx";
import ClinicDetail from "../pages/UserPages/ClinicDetail/index.jsx";
import Home from "../pages/UserPages/Home/index.jsx";
import NotResult from "../pages/UserPages/Not Result/index.jsx";
import CategorDetail from "../pages/UserPages/CategorDetail/index.jsx";
import DoktorDetail from "../pages/UserPages/DoktorDetail/index.jsx";
import AdminCategory from "../pages/AdminPages/AdminCategory/index.jsx";
import AdminClinic from "../pages/AdminPages/AdminClinic/index.jsx";
import AdminDoktor from "../pages/AdminPages/AdminDoktor/index.jsx";
import AdminServices from "../pages/AdminPages/AdminServices/index.jsx";
import AdminContact from "../pages/AdminPages/AdminContact/index.jsx";


const router = [
    {
        path: '/',
        element: <MainPage/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/portfolio",
                // element: <Portfolio/>
            },
            {
                path: "/services",
                // element: <Services/>
            },
            {
                path: "/services/:id",
                element: <ServiceDetail/>
            },
            {
                path: "/clinics/:id",
                element: <ClinicDetail/>
            },
            {
                path: "/category/:id",
                element: <CategorDetail/>
            },
            {
                path: "/doktor/:id",
                element: <DoktorDetail/>
            },
            {
                path: "/about",
                element: <AboutUs/>
            }
        ]
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <AdminPage/>
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/admin/category",
                element: <AdminCategory/>
            },
            {
                path: "/admin/clinic",
                element: <AdminClinic/>
            },
            {
                path: "/admin/doctors",
                element: <AdminDoktor/>
            },
            {
                path: "/admin/service",
                element: <AdminServices/>
            },
            {
                path: "/admin/contact",
                element: <AdminContact/>
            }
        ]
    },
    {
      path: "/login",
      element: <AdminLogin/>
    },
    {
        path: "*",
        element: <NotFound/>
    }
];

export default router;
