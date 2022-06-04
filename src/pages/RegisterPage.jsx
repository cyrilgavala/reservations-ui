import Header from "../widgets/Header";
import ContentWrapper from "../widgets/ContentWrapper";
import RegisterForm from "../widgets/RegisterForm";
import Footer from "../widgets/Footer";

const RegisterPage = () => {

    return <div className="App">
        <Header/>
        <ContentWrapper content={<RegisterForm/>}/>
        <Footer/>
    </div>
}

export default RegisterPage;