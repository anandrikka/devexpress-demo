import React from 'react';
import { v4 as uuid } from 'uuid';
// import ArrayStore from 'devextreme/data/array_store';
import EditNodePopup from './EditNodePopup';
import { nodeData, edgeData, legalEntites, investments, regions, typeToTaxStatusMap } from './data';
import savedData from './saved-data';

const DevExpress = window.DevExpress;


const entityShapes = [
  {
    type: "Oval",
    category: "entities",
    baseType: "ellipse",
    taxStatusId: 2,
    taxStatusName: 'Branch (US) Branch (Local)',
    allowEditText: false,
    toolboxTemplate: `
      <svg>
        <ellipse stroke="#000" ry="15" rx="25" id="svg_3" cy="35.8" cx="27" fill="#fff" />
        <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_6" y="29.8" x="100" stroke="#000" fill="#000000">Branch (US)</text>
        <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_7" y="46.8" x="108" stroke="#000" fill="#000000">Branch (Local)</text>
      </svg>
    `,
    // toolboxWidthToHeightRatio: 1,
  },
  {
    taxStatusId: 1,
    taxStatusName: 'Corporation (US) Corporation (Local)',
    type: "Rectangle",
    category: "entities",
    baseType: "rectangle",
    allowEditText: false,
    shape: 'Rectangle',
    toolboxTemplate: `
      <svg>
        <g>
          <rect stroke="#000" x="7" y="21" width="41" height="29" fill="#fff"/>
          <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_6" y="29.8" x="110" stroke="#000" fill="#000000"> Corporation (US)</text>
          <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_7" y="46.8" x="118" stroke="#000" fill="#000000">
            Corporation (Local)
          </text>
        </g>
      </svg>
    `,
    // toolboxWidthToHeightRatio: 1,
  },
  {
    taxStatusId: 6,
    taxStatusName: 'Corporation (US) Partnership (Local)',
    shape: 'Inv-Triangle-Rectangle',
    type: "Inv-Triangle-Rectangle",
    category: "entities",
    baseType: "rectangle",
    allowEditText: false,
    // toolboxWidthToHeightRatio: 1,
    toolboxTemplate: `
      <svg>
        <g>
          <rect id="svg_13" height="25" width="41" y="24.29999" x="6" stroke="#0f0f00" fill="#ffffff"/>
          <!-- <rect stroke="#000" id="svg_1" height="79" width="140" y="102.4" x="78.6" fill="#fff" /> -->
          <text text-anchor="start" font-size="4" stroke-width="0" id="svg_6" y="32.8" x="110" stroke="#000"  fill="#000000">Corporation (US)</text>
          <text text-anchor="start" font-size="4" stroke-width="0" id="svg_7" y="48.8" x="118" stroke="#000" fill="#000000">Partnership (Local)</text>
          <path transform="rotate(180 26.435 36.7716)" stroke="#0f0f00" id="svg_14" d="m5.935,49.27162l20.5,-25l20.5,25l-41,0z" fill="#ffffff" />
        </g>
      </svg>
    `
  },
  {
    taxStatusId: 5,
    taxStatusName: 'Disregarded (US) Corporation (Local)',
    shape: 'Oval-Rectangle',
    type: "Oval-Rectangle",
    category: "entities",
    baseType: "rectangle",
    allowEditText: false,
    // toolboxWidthToHeightRatio: 1,
    toolboxTemplate: `
      <svg>
        <g>
          <rect id="svg_13" height="25" width="41" y="26.29999" x="6" stroke="#0f0f00" fill="#ffffff" />
          <text text-anchor="start" font-size="4" stroke-width="0" id="svg_6" y="32.8" x="110" stroke="#000" fill="#000000">Disregarded (US)</text>
          <text text-anchor="start" font-size="4" stroke-width="0" id="svg_7" y="48.8" x="118" stroke="#000" fill="#000000">Corporation (Local)</text>
          <ellipse stroke="#0f0f00" ry="12" rx="19" id="svg_15" cy="39.29999" cx="26" fill="#ffffff" />
        </g>
      </svg>
    `,
  },
  {
    taxStatusId: 7,
    taxStatusName: 'Disregarded (US) Partnership (Local)',
    shape: 'Oval-Triangle',
    baseType: 'triangle',
    type: "Oval-Triangle",
    category: "entities",
    baseType: "triangle",
    allowEditText: false,
    connectionPoints: [
      { x: 0.25, y: 0.5 },
      { x: 0.75, y: 0.5 },
      { x: 0.5, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: 0.5, y: 0 }
    ],
    toolboxTemplate: `
      <svg xmlns="http://www.w3.org/2000/svg" width="220" height="75">
        <g>
          <rect stroke="#000" id="svg_1" height="79" width="140" y="102.4" x="78.6" fill="#fff" />
          <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_6" y="32.8" x="110" stroke="#000" fill="#000000">Disregarded (US)</text>
          <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_7" y="48.8" x="118" stroke="#000" fill="#000000">Partnership (Local)</text>
          <path stroke="#0f0f00" id="svg_14" d="m5.935,48.27162l20.5,-23l20.5,23l-41,0z" fill="#ffffff" />
          <ellipse stroke="#0f0f00" ry="7" rx="10.5" id="svg_17" cy="40.29999" cx="26.5" fill="#ffffff" />
        </g>
      </svg>
    `
  },
  {
    taxStatusId: 4,
    taxStatusName: 'Partnership (US) Corporation (Local)',
    shape: 'Triangle-Rectangle',
    type: "Triangle-Rectangle",
    category: "entities",
    baseType: "rectangle",
    allowEditText: false,
    toolboxTemplate: `
      <svg xmlns="http://www.w3.org/2000/svg" width="220" height="75">
        <g>
          <rect id="svg_13" height="25" width="41" y="24.29999" x="6" stroke="#0f0f00" fill="#ffffff" />
          <rect stroke="#000" id="svg_1" height="79" width="140" y="102.4" x="78.6" fill="#fff" />
          <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_6" y="29.8" x="110" stroke="#000" fill="#000000">Partnership (US)</text>
          <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_7" y="46.8" x="118" stroke="#000" fill="#000000">Corporation (Local)</text>
          <path stroke="#0f0f00" id="svg_14" d="m5.935,49.27162l20.5,-24l20.5,24l-41,0z" fill="#ffffff" />
        </g>
      </svg>
    `
  },
  {
    taxStatusId: 3,
    taxStatusName: 'Partnership (US) Partnership (Local)',
    type: "Triangle",
    category: "entities",
    shape: 'Triangle',
    baseType: 'triangle',
    allowEditText: false,
    connectionPoints: [
      { x: 0.25, y: 0.5 },
      { x: 0.75, y: 0.5 },
      { x: 0.5, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
      { x: 0.5, y: 0 }
    ],
    toolboxTemplate: `
      <svg>
        <g>
          <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_6" y="29.8" x="110" stroke="#000" fill="#000000">Partnership (US)</text>
          <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_7" y="46.8" x="118" stroke="#000" fill="#000000">Partnership (Local)</text>
          <path stroke="#000" id="svg_10" d="m9.955,48.29161l19.5,-32l19.5,32l-39,0z" fill="#000000" />
        </g>
      </svg>
    `,
  }
]

function customShapeToolboxTemplatev2(item, $container) {
  const { type } = item;
  console.log($container)
  let $content = '<svg></svg>';
  switch (type) {
    case 'Oval':
      $content = `
      <svg>
        <ellipse stroke="#000" ry="15" rx="25" id="svg_3" cy="35.8" cx="27" fill="#fff" />
        <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_6" y="29.8" x="100" stroke="#000" fill="#000000">Branch (US)</text>
        <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_7" y="46.8" x="108" stroke="#000" fill="#000000">Branch (Local)</text>
      </svg>
      `;
    case 'Inv-Triangle-Rectangle':
      $content = `
        <svg>
          <g>
            <rect id="svg_13" height="25" width="41" y="24.29999" x="6" stroke="#0f0f00" fill="#ffffff"/>
            <!-- <rect stroke="#000" id="svg_1" height="79" width="140" y="102.4" x="78.6" fill="#fff" /> -->
            <text text-anchor="start" font-size="4" stroke-width="0" id="svg_6" y="32.8" x="110" stroke="#000"  fill="#000000">Corporation (US)</text>
            <text text-anchor="start" font-size="4" stroke-width="0" id="svg_7" y="48.8" x="118" stroke="#000" fill="#000000">Partnership (Local)</text>
            <path transform="rotate(180 26.435 36.7716)" stroke="#0f0f00" id="svg_14" d="m5.935,49.27162l20.5,-25l20.5,25l-41,0z" fill="#ffffff" />
          </g>
        </svg>
      `;
      break;
    case 'Triangle-Rectangle':
      $content = `
        <svg xmlns="http://www.w3.org/2000/svg" width="220" height="75">
          <g>
            <rect id="svg_13" height="25" width="41" y="24.29999" x="6" stroke="#0f0f00" fill="#ffffff" />
            <rect stroke="#000" id="svg_1" height="79" width="140" y="102.4" x="78.6" fill="#fff" />
            <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_6" y="29.8" x="110" stroke="#000" fill="#000000">Partnership (US)</text>
            <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_7" y="46.8" x="118" stroke="#000" fill="#000000">Corporation (Local)</text>
            <path stroke="#0f0f00" id="svg_14" d="m5.935,49.27162l20.5,-24l20.5,24l-41,0z" fill="#ffffff" />
          </g>
        </svg>
      `;
      break;
    case 'Oval-Rectangle':
      $content = `
        <svg xmlns="http://www.w3.org/2000/svg" width="220" height="75">
          <g>
            <rect stroke="#000" id="svg_1" height="79" width="140" y="102.4" x="78.6" fill="#fff" />
            <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_6" y="32.8" x="110" stroke="#000" fill="#000000">Disregarded (US)</text>
            <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_7" y="48.8" x="118" stroke="#000" fill="#000000">Partnership (Local)</text>
            <path stroke="#0f0f00" id="svg_14" d="m5.935,48.27162l20.5,-23l20.5,23l-41,0z" fill="#ffffff" />
            <ellipse stroke="#0f0f00" ry="7" rx="10.5" id="svg_17" cy="40.29999" cx="26.5" fill="#ffffff" />
          </g>
        </svg>
      `;
      break;
    case 'Oval-Triangle':
      $content = `
        <svg xmlns="http://www.w3.org/2000/svg" width="220" height="75">
          <g>
            <rect stroke="#000" id="svg_1" height="79" width="140" y="102.4" x="78.6" fill="#fff" />
            <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_6" y="32.8" x="110" stroke="#000" fill="#000000">Disregarded (US)</text>
            <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_7" y="48.8" x="118" stroke="#000" fill="#000000">Partnership (Local)</text>
            <path stroke="#0f0f00" id="svg_14" d="m5.935,48.27162l20.5,-23l20.5,23l-41,0z" fill="#ffffff" />
            <ellipse stroke="#0f0f00" ry="7" rx="10.5" id="svg_17" cy="40.29999" cx="26.5" fill="#ffffff" />
          </g>
        </svg>
      `;
      break;
    case 'Triangle':
      $content = `
        <svg>
          <g>
            <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_6" y="29.8" x="110" stroke="#000" fill="#000000">Partnership (US)</text>
            <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_7" y="46.8" x="118" stroke="#000" fill="#000000">Partnership (Local)</text>
            <path stroke="#000" id="svg_10" d="m9.955,48.29161l19.5,-32l19.5,32l-39,0z" fill="#000000" />
          </g>
        </svg>
      `;
    case 'Rectangle':
      $content = `
        <svg>
          <g>
            <rect stroke="#000" x="7" y="21" width="41" height="29" fill="#fff"/>
            <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_6" y="29.8" x="110" stroke="#000" fill="#000000"> Corporation (US)</text>
            <text text-anchor="start" font-size="7.5" stroke-width="0" id="svg_7" y="46.8" x="118" stroke="#000" fill="#000000">
              Corporation (Local)
            </text>
          </g>
        </svg>
      `;
    default:
      break;
  }
  $container.append($content);
}

function customShapeToolboxTemplate(item, $container) {
  const { type } = item;
  let $content = '<svg></svg>';
  switch (type) {
    case 'Inv-Triangle-Rectangle':
      $content = `
        <svg>
          <line x1="0%" y1="0%" x2="50%" y2="100%" />
          <line x1="100%" y1="0%" x2="50%" y2="100%" />
        </svg>
      `;
      break;
    case 'Triangle-Rectangle':
      $content = `
        <svg>
          <line x1="50%" y1="0%" x2="0%" y2="100%" />
          <line x1="50%" y1="0%" x2="100%" y2="100%" />
        </svg>
      `;
      break;
    case 'Oval-Rectangle':
      $content = `
        <svg>
          <ellipse cx="50%" cy="50%" rx="50%" ry="50%" />
        </svg>
      `;
      break;
    case 'Oval-Triangle':
      $content = `
        <svg>
          <ellipse cx="50%" cy="68%" rx="30%" ry="30%" />
        </svg>
      `;
      break;
    default:
      break;
  }
  $container.append($content);
}

function customShapeTemplate(item, $container) {
  customShapeToolboxTemplate(item, $container);
}

class CustomTemplateEdit extends React.Component {

  constructor(props) {
    super(props);
    this.nodeSource = new DevExpress.data.ArrayStore({
      key: 'id',
      data: [],
      onInserting: function (values) {
        console.log('Val: ', values)
        values.id = values.id || uuid();
        values.region = values.region || "";
        values.investment = values.investment || "";
        values.legalEntity = values.legalEntity || '';
        // values.taxStatusId = 
      }
    })
    this.edgeSource = new DevExpress.data.ArrayStore({
      key: 'id',
      data: []
    });
    this.state = {
      showEditNodePopup: false,
      selectedNodeItem: {},
      readOnly: false,
    }
  }

  componentDidMount() {
    const _this = this;
    this.diagramRef = window.$('#custom-template-edit-demo').dxDiagram({
      height: '750',
      readOnly: _this.state.readOnly,
      customShapes: [...entityShapes],
      customShapeToolboxTemplate: customShapeToolboxTemplate,
      customShapeTemplate: customShapeTemplate,
      onItemDblClick: _this.onNodeDblClick,
      onRequestLayoutUpdate: _this.onRequestLayoutUpdate,
      onRequestEditOperation: _this.onRequestEditOperation,
      onCustomCommand: _this.onCustomCommand,
      selectionChanged: _this.selectionChanged,
      contentReady: _this.contentReady,
      toolbox: {
        width: 220,
        showSearch: false,
        shapeIconsPerRow: 1,
        groups: [
          { category: 'entities', title: 'Entities' }
        ]
      },
      nodes: {
        dataSource: _this.nodeSource,
        keyExpr: 'id',
        typeExpr: _this.typeExpr,
        textExpr: _this.textExpr,
        styleExpr: _this.styleExpr,
        textStyleExpr: _this.textStyleExpr,
        leftExpr: 'x',
        topExpr: 'y',
        customDataExpr: function (obj, value) {
          if (value === undefined) {
            return {
              type: obj.type,
              region: obj.region,
              legalEntity: obj.legalEntity,
              investment: obj.investment
            };
          } else {
            obj.type = value.type;
            obj.region = value.region;
            obj.legalEntity = value.legalEntity;
            obj.investment = value.investment;
          }
        },
        autoSizeEnabled: true,
        autoLayout: {
          type: 'layered'
        }
      },
      edges: {
        dataSource: _this.edgeSource,
        keyExpr: 'id',
        fromExpr: 'from',
        toExpr: 'to'
      },
      historyToolbar: {
        visible: false
      },
      viewToolbar: {
        visible: false,
      },
      mainToolbar: {
        visible: true,
        commands: [
          { name: "undo" },
          { name: "redo" },
          { name: "separator" },
          { name: "fontName" },
          { name: "fontSize" },
          { name: "separator" },
          { name: "bold" },
          { name: "italic" },
          { name: "underline" },
          { name: "separator" },
          { name: "fontColor" },
          { name: "fillColor" },
          { name: "separator" },
          // { name: 'zoomLevel' },
          // { name: 'fullScreen' },
          // { name: "separator" },
          { name: "lineColor" },
          { name: "lineWidth" },
          { name: "separator" },
          { name: 'lineStyle' },
          { name: 'connectorLineType' },
          { name: 'connectorLineStart' },
          { name: 'connectorLineEnd' },
          { name: "separator" },
          { name: "export", icon: "export", items: ["exportSvg", "exportPng", "exportJpg", { name: 'exportJson', text: 'Export to JSON' }] },
          { name: 'import', icon: 'paste', text: 'Import' },
          { name: 'separator' },
          { name: "readOnly", icon: "edit", text: "Make Read Only" },
          { name: "clear", icon: "clearsquare", text: "Clear Diagram" }
        ]
      }
    }).dxDiagram("instance")
    this.diagramRef.on('selectionChanged', _this.selectionChanged)
  }

  onNodeDblClick = ({ item, ...props }) => {
    console.log(item, props)
    if (item.itemType === 'connector') {
      return;
    }
    this.setState({
      selectedNodeItem: Object.assign({}, item.dataItem),
      showEditNodePopup: true,
    })
  }

  textExpr = props => {
    const { investment, region, legalEntity } = props;
    // const text = `${regions.find(r => r.id === region)?.label || ''} - ${legalEntites.find(le => le.id === legalEntity)?.label || ''} - ${investments.find(inv => inv.id === investment)?.label || ''}`
    const text = `${legalEntites.find(le => le.id === legalEntity)?.label || ''}`
    return text.replace(' -  - ', '');
  }

  typeExpr = (props, x) => {
    return props.type;
  };

  // update these functions
  styleExpr = props => {
    return props.style;
  }

  textStyleExpr = props => {
    return props.styleText;
  }

  onCustomCommand = ({ name }) => {
    if (name === 'exportJson') {
      this.export = this.diagramRef.export();
      console.log(this.export);
      const shapes = JSON.parse(this.diagramRef.export()).shapes;     
      this.nodeSource._array.forEach(n => {
        const shape = shapes.find(item => item.dataKey === n.id)
        const { style, styleText, type, x, y } = shape;
        n.style = style;
        n.styleText = styleText;
        n.type = type;
        n.x = x;
        n.y = y;
      });
      this.savedData = {
        nodes: JSON.parse(JSON.stringify(this.nodeSource._array)),
        edges: JSON.parse(JSON.stringify(this.edgeSource._array))
      };
    } else if (name === 'clear') {
      this.diagramRef.import('')
    } else if (name === 'readOnly') {
      this.setState({
        readOnly: !this.state.readOnly
      })
      this.diagramRef.readOnly = true;
      this.diagramRef._updateReadOnlyState();
    } else if (name === 'import') {
      // this.diagramRef.import(this.export)
      this.diagramRef.import(JSON.stringify(savedData))
      // this.nodeSource.push(
      //   this.savedData.nodes.map(n => ({
      //     type: 'insert',
      //     data: { ...n },
      //     key: n.id
      //   }))
      // )
      // this.edgeSource.push(
      //   this.savedData.edges.map(n => ({
      //     type: 'insert',
      //     data: { ...n },
      //     key: n.id
      //   }))
      // )
    }
  }

  onRequestLayoutUpdate = e => {
    // console.log('x->', e)
  }

  onRequestEditOperation = e => {
    // console.log('y->', e);
  }

  selectionChanged = e => {
    // console.log('e-->', e)
  }

  contentReady = e => {
    // console.log(e);
  }

  saveUpdate = (item) => {
    this.nodeSource.push([
      {
        type: 'update',
        key: this.state.selectedNodeItem.id,
        data: {
          ...item
        }
      }
    ])
    this.setState({
      selectedNodeItem: {},
      showEditNodePopup: false,
    })
  }
  
  cancelUpdate = () => {
    this.setState({
      selectedNodeItem: {},
      showEditNodePopup: false,
    })
  }

  render() {
    return (
      <div>
        <div id="custom-template-edit-demo"></div>
        <div>
          <img src="/images/legends.png" />
        </div>
        <EditNodePopup
          visible={this.state.showEditNodePopup}
          nodeItem={this.state.selectedNodeItem}
          saveUpdate={this.saveUpdate}
          cancelUpdate={this.cancelUpdate}
          regions={regions}
          investments={investments}
          legalEntites={legalEntites}
        />
      </div>
    );
  }
}

export default CustomTemplateEdit;
