import ContentWrapper from "../widgets/ContentWrapper";
import RegisterForm from "../widgets/RegisterForm";

const RegisterPage = () => {

    return <div className="App">
        <ContentWrapper content={<RegisterForm/>}/>
    </div>
}

export default RegisterPage;