import React, { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import { SheetComponent } from '@antv/s2-react';
import insertCss from 'insert-css';
import '@antv/s2-react/dist/style.min.css';


   

   

    const SwitcherDemo = () => {

      const s2Options = {
        width: 600,
        height: 480,
      };
      const fields = {
        rows: ['province', 'city'],
        columns: ['type'],
        values: ['price', 'cost'],
      };

      const [data, setData] = useState({})
      
      useEffect(() => {
        fetch(
          'https://gw.alipayobjects.com/os/bmw-prod/cadff60b-363b-438a-b490-eb3367b998b3.json',
        )
          .then((res) => res.json())
          .then((data) => { 
            setData(data)
          })
      },[])

      return (
        <div>
          <SheetComponent
            sheetType={'pivot'}
            adaptive={false}
            dataCfg={{ data, fields }}
            options={s2Options}
            header={{ switcherCfg: { open: true } }}
          />
        </div>
      );
    };

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  .antv-s2-switcher-item.checkable-item {
    align-items: center;
  }
`);

export default SwitcherDemo
