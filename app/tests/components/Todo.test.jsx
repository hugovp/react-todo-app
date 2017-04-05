const React     = require('react');
const ReactDOM  = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const expect    = require('expect');
const $         = require('jquery');
const { Todo }  = require('Todo');
describe('Todo', () => {
  it('should exists', () => {
    expect(Todo).toExist();
  });
  it('should dispatch TOGGLE_TODO action on click', () => {
    const todo = {
      id          : 199,
      text        : 'Write todo test',
      completed   : true,
      createdAt   : 0,
      completedAt : null,
    };
    const spy   = expect.createSpy();
    const cTodo = TestUtils.renderIntoDocument(<Todo { ...todo } dispatch={ spy }/>);
    const $el   = $(ReactDOM.findDOMNode(cTodo))[0];
    TestUtils.Simulate.click($el);
    expect(spy).toHaveBeenCalledWith({
      type : 'TOGGLE_TODO',
      id   : todo.id
    });
  });
});
