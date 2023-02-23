import { Layout } from "antd"
import TopNavigation from "../navigation/TopNavigation"

const {Header, Footer, Content } = Layout

const headerStyle = {
    textAlign:'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight:'60px',
    backgroundColor:'#14213d'
}

const contentStyle = {
    textAlign: 'start',
    minHeight: 120,
    lineHeight: '120px',
    // color: '#fff',
    // backgroundColor: '#14213d'
}

const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#14213d'
}




const AppLayout = ({children}) =>{

    return (
        <Layout style={{minHeight:'100vh'}}>
             <Header  style={headerStyle}><TopNavigation/> </Header>
             <Content style={contentStyle}>{children}</Content>
             <Footer style={footerStyle}>Footer</Footer>
        </Layout>
    )
}

export default AppLayout