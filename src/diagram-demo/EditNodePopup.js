import { Popup } from 'devextreme-react/popup';
import { SelectBox } from 'devextreme-react/select-box';
import ScrollView from 'devextreme-react/scroll-view';
import Button from 'devextreme-react/button';
import React from 'react';

function EditNodePopup({ visible, cancelUpdate, saveUpdate, nodeItem, regions,legalEntites, investments }) {

  const [item, setItem] = React.useState(nodeItem)

  // Update whenever node item changes
  React.useEffect(() => {
    setItem(Object.assign({}, nodeItem))
    // console.log('Node: ', nodeItem)
  }, [nodeItem])

  const handleSelectChange = ({ element, value }) => {
    setItem({
      ...item,
      [element.id]: value
    })
  };

  const _saveUpdate = React.useCallback(() => {
    saveUpdate(item);
  }, [item, saveUpdate])

  return (
    <Popup
      visible={visible}
      onHiding={cancelUpdate}
      showTitle={true}
      title="Edit Node"
      width={600}
      minHeight={200}
      maxHeight={400}>
        <ScrollView scrollByContent>
          <div className="dx-fieldset">
            {/* <div className="dx-field">
              <div className="dx-field-label">Region</div>
              <div className="dx-field-value">
                <SelectBox
                  id="region"
                  dataSource={regions}
                  valueExpr="id"
                  displayExpr="label"
                  value={item.region}
                  onValueChanged={handleSelectChange} />
              </div>
            </div> */}
            <div className="dx-field">
                <div className="dx-field-label">Legal Entity</div>
                <div className="dx-field-value">
                  <SelectBox
                    id="legalEntity"
                    dataSource={legalEntites}
                    valueExpr="id"
                    displayExpr="label"
                    value={item.legalEntity}
                    onValueChanged={handleSelectChange} />
                </div>
            </div>
            {/* <div className="dx-field">
              <div className="dx-field-label">Investments</div>
              <div className="dx-field-value">
                <SelectBox
                  id="investment"
                  dataSource={investments}
                  valueExpr="id"
                  displayExpr="label"
                  value={item.investment}
                  onValueChanged={handleSelectChange} />
              </div>
            </div> */}
          </div>
          <div className="dx-fieldset buttons">
            <Button text="Update" type="default" onClick={_saveUpdate}></Button>
            <Button text="Cancel" onClick={cancelUpdate}></Button>
          </div>
        </ScrollView>
    </Popup>
  )
}

export default EditNodePopup;
