import './App.css';
import 'antd/dist/antd.css'; 
import PivotComponent from './PivotComponent'
import { Row, Col } from 'antd';
function App() {
  return (
    <div className="App" style={{ height:'100vh'}}>
      <Row style={{height:'50vh'}}>
        <Col span={12} style={{ background: '#999' }}>
          <PivotComponent style={{background:'#ccc'}}></PivotComponent>
        </Col>
        <Col span={12}>2</Col>
      </Row>
    </div>
  );
}

export default App;
