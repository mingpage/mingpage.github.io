
class Index extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {

    };
    flush=(e)=>{
        this.setState({});
        this.refs.table.handleSearch();
    };
    render() {
        return(
            <div>
                <Head flush={this.flush}/>

                <div>
                   <a   href={M.baseUrl+"index_manager.html"}>后台管理</a>&nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;&nbsp;
                   <a   onClick={()=>{M.setAttribute("userInfo",{});location.reload()} } href="#">退出</a>
                </div>
           
                <Table ref="table"/>
            </div>
        )
    }

}