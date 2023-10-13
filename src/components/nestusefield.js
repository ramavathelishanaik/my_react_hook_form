import React from "react";

function Nestedusefield() {
  const {
    fields: parentFields,
    append: appendParent,
    remove: removeParent,
  } = useFieldArray({
    control,
    name: "parents",
  });

  parents: [
    {
      name: "Parent 1",
      children: [{ name: "Child 1" }, { name: "Child 2" }],
    },
    {
      name: "Parent 2",
      children: [{ name: "Child 3" }, { name: "Child 4" }],
    },
  ],

  // const { control: childControl, remove: removeChild, append: appendChild } = useFieldArray({
  //   control,
  //   name: 'parents[].children',
  // });
  return (
    <div>
      {/* nested useFieldArray  */}
      <div>
        {parentFields.map((parent, parentIndex) => (
          <div key={parent.id}>
            <input
              type="text"
              name={`parents[${parentIndex}].name`}
              defaultValue={parent.name}
              ref={control.register()}
            />

            {/* Nested FieldArray */}
            {parent.children.map((child, childIndex) => (
              <div key={child.id}>
                <input
                  type="text"
                  name={`parents[${parentIndex}].children[${childIndex}].name`}
                  defaultValue={child.name}
                  ref={control.register()}
                />
                {/* <button
                        type="button"
                        onClick={() => removeChild(parentIndex, childIndex)}
                      >
                        Remove Child
                      </button> */}
              </div>
            ))}

            {/* <button
                    type="button"
                    onClick={() => appendChild(parentIndex, { name: "" })}
                  >
                    Add Child
                  </button> */}

            <button type="button" onClick={() => removeParent(parentIndex)}>
              Remove Parent
            </button>
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          onClick={() =>
            appendParent([
              {
                name: "Parent 1",
                children: [{ name: "Child 1" }, { name: "Child 2" }],
              },
              {
                name: "Parent 2",
                children: [{ name: "Child 3" }, { name: "Child 4" }],
              },
            ])
          }
        >
          Append Parent
        </button>
      </div>

     
    </div>
  );
}

export default Nestedusefield;
