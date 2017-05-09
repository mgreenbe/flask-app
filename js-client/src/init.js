import Immutable from 'immutable';

const source = `<div>
  <Button actionType='"PUSH"' path='"list"' item='"qux"'>PUSH</Button>
  {{#each list}}<p>Foo {{math @index "+" 1}}: {{this}}</p>{{/each}}
</div>`;

const initialState = Immutable.fromJS({
  mnt: {
    source,
    context: {
      list: ["foo", "bar", "baz"]
    }
  }
});

export default initialState;
