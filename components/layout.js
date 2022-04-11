import Header from './header';
import Footer from './footer';

export default function Layout({children}) {
    return (
        <div className="container mx-auto pl-2 pt-2">
            <Header/>
            <hr/>
            <main>{children}</main>
            <hr/>
            <Footer/>
        </div>
    );
}