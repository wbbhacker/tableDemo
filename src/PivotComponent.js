
import { React, useRef,useEffect, useState,} from 'react';
import insertCss from 'insert-css';
import { SheetComponent } from '@antv/s2-react';
import '@antv/s2-react/dist/style.min.css';
import res from './data.json'
import { Button } from 'antd';

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
  const getTargetColor = (value) => {
    if (isNaN(Number(value))) {
      return PALETTE_COLORS[0].background;
    }
    return PALETTE_COLORS[Math.floor(Number(value) / 10)].background;
  };
  // const sortParams = [
  //   { sortFieldId: 'type', sortMethod: 'DESC' },
  //   { sortFieldId: 'job', sortMethod: 'DESC'},
  //   { sortFieldId: 'age', sortMethod: 'DESC'},
  //   {sortFieldId: 'age', sortMethod: 'DESC'},
  //   {sortFieldId: 'city', sortMethod: 'DESC'},
  //   {sortFieldId: 'count', sortMethod: 'DESC'},
  // ];
  const s2DataConfig = {
    fields: {
      rows: ['type', 'job','sex'],
      columns: ['age', 'city'],
      values: ['count'],
      valueInCols: true,
    },
    meta: [
      {
        field: 'type',
        name: '类别',
      },
      {
        field: 'sex',
        name:'性别'
      },
      {
        field: 'job',
        name: '职业',
      },
      {
        field: 'age',
        name: '年龄分布',
      },
      {
        field: 'city',
        name: '所在城市',
      },
      {
        field: 'count',
        name: '数值',
      },
    ],
    data: res.data,
    // sortParams
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
      background: [
        {
          field: 'count',
          mapping(value) {
            const backgroundColor = getTargetColor(value);
            return {
              fill: backgroundColor,
            };
          },
        },
      ],
    },
  
  };


  // const [dataCfg, setDataCfg] = useState(s2DataConfig);
  const [s2OptionsCfg, setS2OptionsCfg] = useState(s2Options);
  const [isTree, setIsTree] = useState(false)

  const buttonClick = () => { 
    setS2OptionsCfg({ ...s2OptionsCfg, ...{hierarchyType: !isTree ? 'tree' : 'grid'}})
    setIsTree(!isTree)
  }

  return <div ref={ divRef }>
     <SheetComponent
      dataCfg={s2DataConfig}
      options={s2OptionsCfg}
      sheetType='pivot'
      adaptive={{ width: true, height: true }}
      ref={s2Ref}
      header={{
        switcherCfg: {
          // open:true
        },
        extra: (
          <Button size={'small'} style={{ verticalAlign: 'top' }} onClick={  buttonClick }>
            { `切换${isTree ? '平铺' :'树形'}形态`}
          </Button>
        ),
        advancedSortCfg: {
          open: true
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








