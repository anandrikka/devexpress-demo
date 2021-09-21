import React from "react"
import { v4 as uuidv4 } from 'uuid';
import Diagram, {
  CustomShape,
  Group,
  Toolbox,
  Nodes,
  AutoLayout,
  ViewToolbar,
  MainToolbar,
  HistoryToolbar,
  PropertiesPanel,
} from "devextreme-react/diagram";
import { Popup } from "devextreme-react/popup";
import TextBox from "devextreme-react/text-box";
import Button from "devextreme-react/button";
import ArrayStore from "devextreme/data/array_store";
import CustomShapeTemplate from "./CustomShapeTemplate.js";
import CustomShapeToolboxTemplate from "./CustomShapeToolboxTemplate.js";
import service from "./data2.js";
import { entities } from "./customData";
import customToolboxSvgs from './customToolboxSvgs';

class CustomTemplateEdit2 extends React.Component {
  constructor(props) {
    super(props);
    var that = this;
    this.generatedID = 100;
    this.employees = service.getEmployees();
    this.diagramRef = React.createRef();
    this.dataSource = new ArrayStore({
      key: "ID",
      data: [],
      onInserting: function (values, key) {
        this.update(key, {
          ID: values.ID || uuidv4(),
          Full_Name: values.Full_Name || "Employee's Name",
          Title: values.Title || "Employee's Title",
        });
      },
    });

    this.state = {
      currentEmployee: {},
      popupVisible: false,
    };

    this.onRequestLayoutUpdate = this.onRequestLayoutUpdate.bind(this);
    this.customShapeTemplate = this.customShapeTemplate.bind(this);
    this.customShapeToolboxTemplate =
      this.customShapeToolboxTemplate.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.cancelEditEmployee = this.cancelEditEmployee.bind(this);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSkypeChange = this.handleSkypeChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }
  itemTypeExpr(props) {
    return "demo";
  }
  itemCustomDataExpr(obj, value) {
    if (value === undefined) {
      return {
        Full_Name: obj.Full_Name,
        Prefix: obj.Prefix,
        Title: obj.Title,
        City: obj.City,
        State: obj.State,
        Email: obj.Email,
        Skype: obj.Skype,
        Mobile_Phone: obj.Mobile_Phone,
      };
    } else {
      obj.Full_Name = value.Full_Name;
      obj.Prefix = value.Prefix;
      obj.Title = value.Title;
      obj.City = value.City;
      obj.State = value.State;
      obj.Email = value.Email;
      obj.Skype = value.Skype;
      obj.Mobile_Phone = value.Mobile_Phone;
    }
  }
  onRequestLayoutUpdate(e) {
    e.allowed = true;
    // for (var i = 0; i < e.changes.length; i++) {
    //   if (e.changes[i].type === "remove") {
    //     e.allowed = true;
    //   } else if (
    //     e.changes[i].data.Head_ID !== undefined &&
    //     e.changes[i].data.Head_ID !== null
    //   ) {
    //     e.allowed = true;
    //   }
    // }
  }

  onSelectionChanged = (e) => {
    if (this.diagramRef.current) {
      const instance = this.diagramRef.current.instance;
      console.log(JSON.parse(instance.export()));
    }
  }

  customShapeTemplate(item) {
    return CustomShapeTemplate(
      item.dataItem,
      function () {
        this.editEmployee(item.dataItem);
      }.bind(this),
      function () {
        this.deleteEmployee(item.dataItem);
      }.bind(this)
    );
  }
  customShapeToolboxTemplate() {
    return CustomShapeToolboxTemplate();
  }
  editEmployee(employee) {
    this.setState({
      currentEmployee: Object.assign({}, employee),
      popupVisible: true,
    });
  }
  deleteEmployee(employee) {
    this.dataSource.push([{ type: "remove", key: employee.ID }]);
  }
  updateEmployee() {
    this.dataSource.push([
      {
        type: "update",
        key: this.state.currentEmployee.ID,
        data: {
          Full_Name: this.state.currentEmployee.Full_Name,
          Title: this.state.currentEmployee.Title,
          City: this.state.currentEmployee.City,
          State: this.state.currentEmployee.State,
          Email: this.state.currentEmployee.Email,
          Skype: this.state.currentEmployee.Skype,
          Mobile_Phone: this.state.currentEmployee.Mobile_Phone,
        },
      },
    ]);
    this.setState({
      currentEmployee: {},
      popupVisible: false,
    });
  }
  cancelEditEmployee() {
    this.setState({
      currentEmployee: {},
      popupVisible: false,
    });
  }

  handleChange(field, value) {
    var currentEmployee = Object.assign({}, this.state.currentEmployee);
    currentEmployee[field] = value;
    this.setState({
      currentEmployee,
    });
  }
  handleNameChange(e) {
    this.handleChange("Full_Name", e.value);
  }
  handleTitleChange(e) {
    this.handleChange("Title", e.value);
  }
  handleCityChange(e) {
    this.handleChange("City", e.value);
  }
  handleStateChange(e) {
    this.handleChange("State", e.value);
  }
  handleEmailChange(e) {
    this.handleChange("Email", e.value);
  }
  handleSkypeChange(e) {
    this.handleChange("Skype", e.value);
  }
  handlePhoneChange(e) {
    this.handleChange("Mobile_Phone", e.value);
  }

  render() {
    var popupContentRender = () => {
      return (
        <PopupContentFunc
          currentEmployee={this.state.currentEmployee}
          handleNameChange={this.handleNameChange}
          handleTitleChange={this.handleTitleChange}
          handleCityChange={this.handleCityChange}
          handleStateChange={this.handleStateChange}
          handleEmailChange={this.handleEmailChange}
          handleSkypeChange={this.handleSkypeChange}
          handlePhoneChange={this.handlePhoneChange}
          updateEmployeeClick={this.updateEmployee}
          cancelEditEmployeeClick={this.cancelEditEmployee}
        />
      );
    };
    this.renderToolboxCustomShape = ({ type }) => {
      return customToolboxSvgs[type];
    };
    this.renderCustomShape = ({ type, text="This is the biggest text ever", ...props }) => {
      switch (type) {
        case 'Inv-Triangle-Rectangle':
          return (
            <svg>
              <line x1="0%" y1="0%" x2="50%" y2="100%" />
              <line x1="100%" y1="0%" x2="50%" y2="100%" />
            </svg>
          );
        case 'Triangle-Rectangle':
          return (
            <svg>
              <line x1="50%" y1="0%" x2="0%" y2="100%" />
              <line x1="50%" y1="0%" x2="100%" y2="100%" />
            </svg>
          );
        case "Oval":
          return (
            <svg>
              <ellipse cx="50%" cy="50%" rx="50%" ry="50%" />
            </svg>
          );
        case 'Oval-Rectangle':
          return (
            <svg>
              <ellipse cx="50%" cy="50%" rx="50%" ry="50%" />
            </svg>
          );
        case 'Oval-Triangle':
          return (
            <svg>
              <ellipse cx="50%" cy="68%" rx="30%" ry="30%" />
            </svg>
          )
      }
    };

    return (
      <div id="container">
        <Diagram
          id="diagram"
          ref={this.diagramRef}
          customShapeToolboxRender={this.renderToolboxCustomShape}
          customShapeRender={this.renderCustomShape}
        >
          {entities.map((entity) => (
            <CustomShape
              className="demo-xyz"
              allowEditText={false}
              category="entities"
              type={entity.shape}
              key={`entity_${entity.taxStatusId}`}
              defaultWidth={1.5}
              defaultHeight={1}
              toolboxWidthToHeightRatio={2}
              minWidth={1.5}
              minHeight={1.5}
              maxWidth={3}
              maxHeight={2}
              baseType={entity.baseType ? entity.baseType : 'rectangle'}
            />
          ))}
          <Nodes
            dataSource={this.dataSource}
            keyExpr="ID"
            typeExpr={this.itemTypeExpr}
            customDataExpr={this.itemCustomDataExpr}
          >
          </Nodes>         
          <Toolbox showSearch={false} shapeIconsPerRow={1} width={220}>
            <Group category="entities" title="Entities" expanded={true} />
          </Toolbox>
          <HistoryToolbar visible={false}></HistoryToolbar>
          <ViewToolbar visible={false}></ViewToolbar>
          <PropertiesPanel visibility="disabled" />
          <MainToolbar
            visible={true}
            commands={[
              "undo",
              "redo",
              "separator",
              "fontName",
              "fontSize",
              "separator",
              "bold",
              "italic",
              "underline",
              "separator",
              "fontColor",
              "fillColor",
              "separator",
              "lineColor",
              "lineWidth",
              "separator",
              "lineStyle",
              { name: "lineStyle2", items: [{ name: "name1", text: "name2" }]},
              "connectorLineType",
              "connectorLineStart",
              "connectorLineEnd",
              "separator",
              { name: "exportJson", icon: "export", text: "Export to JSON2" },
              { name: 'import', icon: 'paste', text: 'Import' },
              "separator",
              { name: "readOnly", icon: "edit", text: "Make Read Only" },
              { name: "clear", icon: "clearsquare", text: "Clear Diagram" }
            ]}
          ></MainToolbar>
          {/* <PropertiesPanel>
            <Tab>
              <Group
                title="Page Properties"
                commands={["pageSize", "pageOrientation", "pageColor"]}
              />
            </Tab>
          </PropertiesPanel> */}
          <ViewToolbar></ViewToolbar>
        </Diagram>
        <Popup
          visible={this.state.popupVisible}
          onHiding={this.cancelEditEmployee}
          dragEnabled={false}
          showTitle={true}
          title="Edit Employee"
          width={400}
          height={480}
          contentRender={popupContentRender}
        />
      </div>
    );
  }
}

function PopupContentFunc(props) {
  return (
    <React.Fragment>
      <div className="dx-fieldset">
        <div className="dx-field">
          <div className="dx-field-label">Name</div>
          <div className="dx-field-value">
            <TextBox
              value={props.currentEmployee.Full_Name}
              onValueChanged={props.handleNameChange}
              valueChangeEvent="input"
            ></TextBox>
          </div>
        </div>
        <div className="dx-field">
          <div className="dx-field-label">Title</div>
          <div className="dx-field-value">
            <TextBox
              value={props.currentEmployee.Title}
              onValueChanged={props.handleTitleChange}
              valueChangeEvent="input"
            ></TextBox>
          </div>
        </div>
        <div className="dx-field">
          <div className="dx-field-label">City</div>
          <div className="dx-field-value">
            <TextBox
              value={props.currentEmployee.City}
              onValueChanged={props.handleCityChange}
              valueChangeEvent="input"
            ></TextBox>
          </div>
        </div>
        <div className="dx-field">
          <div className="dx-field-label">State</div>
          <div className="dx-field-value">
            <TextBox
              value={props.currentEmployee.State}
              onValueChanged={props.handleStateChange}
              valueChangeEvent="input"
            ></TextBox>
          </div>
        </div>
        <div className="dx-field">
          <div className="dx-field-label">Email</div>
          <div className="dx-field-value">
            <TextBox
              value={props.currentEmployee.Email}
              onValueChanged={props.handleEmailChange}
              valueChangeEvent="input"
            ></TextBox>
          </div>
        </div>
        <div className="dx-field">
          <div className="dx-field-label">Skype</div>
          <div className="dx-field-value">
            <TextBox
              value={props.currentEmployee.Skype}
              onValueChanged={props.handleSkypeChange}
              valueChangeEvent="input"
            ></TextBox>
          </div>
        </div>
        <div className="dx-field">
          <div className="dx-field-label">Phone</div>
          <div className="dx-field-value">
            <TextBox
              value={props.currentEmployee.Mobile_Phone}
              onValueChanged={props.handlePhoneChange}
              valueChangeEvent="input"
            ></TextBox>
          </div>
        </div>
      </div>
      <div className="dx-fieldset buttons">
        <Button
          text="Update"
          type="default"
          onClick={props.updateEmployeeClick}
        ></Button>
        <Button text="Cancel" onClick={props.cancelEditEmployeeClick}></Button>
      </div>
    </React.Fragment>
  );
}
export default CustomTemplateEdit2;
