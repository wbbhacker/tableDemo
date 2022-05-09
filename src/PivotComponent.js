
import { React, useRef,useEffect, useState,} from 'react';
import insertCss from 'insert-css';
import { SheetComponent } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';
import res from './data'
import { Button } from 'antd';

import { EXTRA_FIELD,Aggregation } from '@antv/s2';

console.log(res.data)
function PivotComponent() {
  const divRef = useRef()
  const s2Ref = useRef()
  const PALETTE_COLORS = [
    {
      limit: 10,
      background: '#b8e1ff',
    },
    {
      limit: 20,
      background: '#b4d3fb',
    },
    {
      limit: 30,
      background: '#7daaff',
    },
    {
      limit: 40,
      background: '#5b8ff9',
    },
    {
      limit: 50,
      background: '#3d76dd',
    },
    {
      limit: 60,
      background: '#085ec0',
    },
    {
      limit: 70,
      background: '#085ec0cc',
    },
    {
      limit: 80,
      background: '#0047a5',
    },
    {
      limit: 90,
      background: '#00318a',
    },
    {
      limit: 100,
      background: '#001d70',
    },
  ];

  insertCss(`
  .root{
    display: inline-block;
  }

  .palette-legend {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 8px;
  }

 .palette-color {
    width: 12px;
    height: 12px;
  }

  .palette-limit{
    font-size: 12px;
    color: rgb(94,94,94);
  }

  .palette-color + .palette-limit {
    margin-left: 5px;
  }

  .palette-limit + .palette-color {
    margin-left: 5px;
  }

  .s2-header {
    margin:0px !important;
  }
`);
  const getTargetColor = (value,data) => {
    if (isNaN(Number(value))) {
      return PALETTE_COLORS[0].background;
    }
    if ( data === null || data === undefined || !Object.hasOwn(data, s2DataConfig.fields.rows[0]) ) { 
      return '#ffffff' // 排除 总计
    }
    return PALETTE_COLORS[Math.floor(Number(value) / 1000)].background;
  };
  const s2DataConfig = {
    fields: {
      rows: ['provice', 'city','district'],
      columns: ['type', 'age'],
      values: ['spending'],
      valueInCols: true,
    },
    meta: [
      {
        field: 'provice',
        name: '省份',
      },
      {
        field: 'city',
        name:'城市'
      },
      {
        field: 'district',
        name: '市区',
      },
      {
        field: 'type',
        name: '职业',
      },
      {
        field: 'age',
        name: '年龄',
      },
      {
        field: 'income',
        name: '收入',
      },
      {
        field: 'spending',
        name: '支出',
      },
    ],
    data: res.data,
  };

  const s2Options = {
    tooltip: {
      showTooltip: true,
      operation: {
        hiddenColumns: true,
      },
    },
    hierarchyType:'grid',
    interaction: {
      selectedCellsSpotlight: true,
      hoverHighlight: false,
    },
    style: {
      layoutWidthType: 'colAdaptive',
      colCfg: {
        hideMeasureColumn: true,
      },
      cellCfg: {
        width: 100,
      },
    },
    totals: {
      row: {
        showGrandTotals: true, //是否开启总计
        reverseLayout: true,  //总计的位置，在上/下
        calcTotals: { // 总计的计算方法
          aggregation:Aggregation.SUM
        },
      }
    },
    conditions: {
      text: [
        {
          field: 'count',
          mapping(value) {
            return {
              fill: value >= 50 ? '#fff' : '#282b32',
            };
          },
        },
      ],
      interval: [
        {
          field: 'spending',
          mapping() {
            return {
              fill: '#80BFFF',
              // 自定义柱状图范围
              isCompare: true,
              maxValue: 9900,
              minValue: 1000,
            };
          },
        },
      ],
      background:  []
    },
  
  };

  // const [dataCfg, setDataCfg] = useState(s2DataConfig);
  const [s2OptionsCfg, setS2OptionsCfg] = useState(s2Options);
  const [isTree, setIsTree] = useState(false)
  const [isBgOrIn, setIsBgOrIn] = useState(true)

  const buttonClick = () => {
    setS2OptionsCfg({ ...s2OptionsCfg, ...{hierarchyType: !isTree ? 'tree' : 'grid'}})
    setIsTree(!isTree)
  }

  const buttonClickBg = () => { 

    setS2OptionsCfg({
        ...s2OptionsCfg, ...{
          conditions: {
            interval:!isBgOrIn ? [  {
              field: 'spending',
              mapping() {
                return {
                  fill: '#80BFFF',
                  // 自定义柱状图范围
                  isCompare: true,
                  maxValue: 9900,
                  minValue: 1000,
                };
              },
            }] : [],
            background:isBgOrIn ? [
              {
                field: 'spending',
                mapping(value,data) {
                  return {
                    fill: getTargetColor(value,data),
                  };
                },
              },
            ] : []
      }
  }})

    setIsBgOrIn(!isBgOrIn)
  }

  return <div ref={ divRef }>
     <SheetComponent
      dataCfg={s2DataConfig}
      options={s2OptionsCfg}
      sheetType='pivot'
      adaptive={{ width: true, height: true }}
      ref={s2Ref}
      header={{
        exportCfg: { // 导出组件
          open:true
        },  
        switcherCfg: {
          // open:true
        },
        extra: (
          <>
            <Button size={'small'} style={{ verticalAlign: 'top' }} onClick={  buttonClickBg }>
            { `切换${isBgOrIn ? '背景' :'柱状图'}标记`}
            </Button>
            <Button size={'small'} style={{ verticalAlign: 'top' }} onClick={  buttonClick }>
            { `切换${isTree ? '平铺' :'树形'}形态`}
          </Button>
          </>
         
        ),
        advancedSortCfg: {
          open: true // 高级排序
          // sortParams,
          // onSortConfirm: (ruleValues, sortParams) => {
          //   setDataCfg({ ...dataCfg, sortParams });
          // },
        },
      }}
    />
  </div>
 
}



export default PivotComponent








