const source = `<div className="{{className}}">
<Input path="input" />
<Button actionType="INCREMENT">++</Button>
<Button actionType="SET">Set</Button>
<Button actionType="SUBMIT" url="/api" id="my_button">Submit</Button>
<b>Hi</b>, <i>mom!</i>: <input defaultValue="blah" />
<h1>{{greeting}}</h1>
</div>`;

const initialState = {
  counter: 0,
  value: '',
  mnt: {
    source,
    context: {
      className: "my-class",
      greeting: "Hi, mom!"
    }
  }
};

export default initialState;
