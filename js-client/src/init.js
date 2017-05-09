import Immutable from 'immutable';

const source = `<div>
  <Button actionType='"PUSH"' path='["list"]' item='"{{value}}"'>PUSH</Button>
  {{#each list}}<p>Foo {{math @index "+" 1}}: {{this}}</p>{{/each}}
  Input: <Input type='"number"' path='["value"]' style='{"backgroundColor": "yellow", "color": "blue", "padding": 10}' />
  <p>Value: {{value}}</p>
</div>`;

const initialState = Immutable.fromJS({
  mnt: {
    source,
    context: {
      list: ["foo", "bar", "baz"],
      value: 666
    }
  }
});

export default initialState;
