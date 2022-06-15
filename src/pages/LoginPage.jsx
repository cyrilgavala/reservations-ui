import LoginForm from "../widgets/LoginForm";
import ContentWrapper from "../widgets/ContentWrapper";

const LoginPage = () => {

    return <div className="App">
        <ContentWrapper content={<LoginForm/>}/>
    </div>
}

export default LoginPage;