import React from "react";
import Diagram, {
  CustomShape,
  Group,
  Toolbox,
  Nodes,
  AutoLayout,
  Edges
} from "devextreme-react/diagram";
import ArrayStore from "devextreme/data/array_store";
import $ from 'jquery';

function CustomShapeToolboxTemplate({ type }) {
  if (type === "corporation_partnership") {
    return (
      <svg>
        <line x1="0%" y1="0%" x2="50%" y2="100%" />
        <line x1="100%" y1="0%" x2="50%" y2="100%" />
      </svg>
    );
  } else if (type === "partnership_corporation") {
    return (
      <svg>
        <line x1="50%" y1="0%" x2="0%" y2="100%" />
        <line x1="50%" y1="0%" x2="100%" y2="100%" />
      </svg>
    );
  } else if (type === "disregarded_corporation") {
    return (
      <svg>
        <ellipse cx="50%" cy="50%" rx="50%" ry="50%" />
      </svg>
    );
  } else if (type === "disregarded_partnership") {
    return (
      <svg>
        {/* <circle cx="50%" cy="66%" r="30%" /> */}
        <ellipse cx="50%" cy="68%" rx="30%" ry="30%" />
      </svg>
    );
  }
  return <svg />;
}

function CustomShapeTemplate(props, container) {
  console.log(props, container);
  return CustomShapeToolboxTemplate(props);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.diagramRef = React.createRef();
    const _this = this;
    this.nodes = new ArrayStore({
      key: "id",
      data: [],
      onInserted() {
        console.log(_this.diagramRef.current.instance);
      },
      onInserting: function (values, key) {
        console.log(values, key);
        this.update(key, {
          id: "asdasda"
        });
      }
    });
    this.edges = new ArrayStore({
      key: "id",
      data: []
    });
  }

  componentDidMount() {
    /*
    var diagram = this.diagramRef.current.instance;
    fetch('https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/data/diagram-employees.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        diagram.import(JSON.stringify(json));
      })
      .catch(function() {
        throw 'Data Loading Error';
      });
      */
  }

  customShapeToolboxRender = (props) => CustomShapeToolboxTemplate(props);

  customShapeRender = (props, container) =>
    CustomShapeTemplate(props, container);

  itemTypeExpr = (props) => props.type;

  onRequestLayoutUpdate = (e) => {
    e.allowed = true;
    console.log(this.diagramRef.current.instance);
  };

  onRequestEditOperation = (e) => {
    // console.log(e);
    e.allowed = true;
  };

  render() {
    return (
      <div>
        <div id="diagram-demo"></div>
      </div>
    );
    // return (
    //   <Diagram
    //     id="diagram"
    //     ref={this.diagramRef}
    //     customShapeToolboxRender={this.customShapeToolboxRender}
    //     customShapeRender={this.customShapeRender}
    //     onRequestLayoutUpdate={this.onRequestLayoutUpdate}
    //     onRequestEditOperation={this.onRequestEditOperation}
    //   >
    //     <CustomShape
    //       category="entities"
    //       type="branch"
    //       baseType="ellipse"
    //       defaultText=""
    //       allowEditText={true}
    //     />
    //     <CustomShape
    //       category="entities"
    //       type="corporation"
    //       baseType="rectangle"
    //       defaultText=""
    //       allowEditText={true}
    //     />
    //     <CustomShape
    //       category="entities"
    //       type="corporation_partnership"
    //       baseType="rectangle"
    //       defaultText=""
    //       allowEditText={true}
    //     />
    //     <CustomShape
    //       category="entities"
    //       type="disregarded_corporation"
    //       baseType="rectangle"
    //       defaultText=""
    //       allowEditText={true}
    //     />
    //     <CustomShape
    //       category="entities"
    //       type="disregarded_partnership"
    //       baseType="triangle"
    //       defaultText=""
    //       allowEditText={true}
    //     />
    //     <CustomShape
    //       category="entities"
    //       type="partnership_corporation"
    //       baseType="rectangle"
    //       defaultText=""
    //       allowEditText={true}
    //     />
    //     <CustomShape
    //       category="entities"
    //       type="partnership_partnership"
    //       baseType="triangle"
    //       defaultText=""
    //       allowEditText={true}
    //     />
    //     <Toolbox showSearch={false} shapeIconsPerRow={1} width={120}>
    //       <Group category="entities" title="Entities" />
    //     </Toolbox>
    //   </Diagram>
    // );
  }
}

export default App;
