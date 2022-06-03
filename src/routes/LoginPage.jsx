import Header from "../widgets/Header";
import Footer from "../widgets/Footer";
import LoginForm from "../widgets/LoginForm";
import ContentWrapper from "../widgets/ContentWrapper";

const LoginPage = () => {

    return <div className="App">
        <Header/>
        <ContentWrapper content={<LoginForm/>}/>
        <Footer/>
    </div>
}

export default LoginPage;