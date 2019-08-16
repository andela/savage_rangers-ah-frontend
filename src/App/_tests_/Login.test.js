import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount, shallow } from '../../enzyme';
import { Login, mapDispatchToProps, mapStateToProps } from '../Components/Login';

const props = {
  history: { replace: jest.fn(), push: jest.fn() },
  handleLogin: jest.fn(),
  dispatchLogin: jest.fn(),
  authReducer: {
    user: { token: 'token', username: 'alain' },
    errors: {},
    isAuthorized: true
  }
};

const shallowed = shallow(<Login {...props} />);
shallowed.setProps({
  authReducer: {
    user: { token: 'token', username: 'alain' },
    errors: { email: 'confirm your email first' }
  }
});

const instance = shallowed.instance();

describe('Login', () => {
  const renderLogin = (args) => {
    const defaultProps = {
      dispatchLogin: jest.fn(),
      authReducer: {
        user: { token: 'token', username: 'alain' },
        errors: {},
        isAuthorized: true
      },
      history: { replace: jest.fn() }
    };
    const final = { ...defaultProps, ...args };
    const login = mount(<MemoryRouter>
      <Login {...final} />
                        </MemoryRouter>);
    return login;
  };
  it('should pop up an alert when there is an error', () => {
    const prop = {
      handleLogin: jest.fn(),
      authReducer: {
        user: { token: 'token', username: 'alain' },
        errors: { error: 'invalid message' },
        isAuthorized: false
      },
      dispatchLogin: jest.fn()
    };
    shallow(<Login {...prop} />);
  });
    it('should map the state to props', () => {
      mapStateToProps({ authReducer: {} });
    });
    it('should map the state to props', () => {
      mapDispatchToProps(jest.fn()).dispatchLogin({ Email: 'dhjv', Password: 'dskxfbjhk' });
    });
    it('should handle input change', () => {
      const handleInput = jest.spyOn(instance, 'handleInput');
      const input = shallowed.find('[name="input"]').at(0);
      const event = { target: { name: 'Email', value: 'diane@gmail.com' } };
      input.simulate('change', event);
      expect(handleInput).toHaveBeenCalled();
    });
    it('should throw an error since data is invalid', () => {
      instance.setState({ Email: '', Password: '' });
      jest.mock('simple-react-validator');
      jest.spyOn(instance, 'handleLogin');
      const btn = shallowed.find('[name="submit"]');
      const event = { preventDefault: jest.fn() };
      btn.simulate('click', event);
    });
    it('should handle data submission', () => {
      instance.setState({ Email: 'diane@gmail.com', Password: 'murekateteDiane' });
      jest.mock('simple-react-validator');
      jest.spyOn(instance, 'handleLogin');
      const btn = shallowed.find('[name="submit"]');
      const event = { preventDefault: jest.fn() };
      btn.simulate('click', event);
    });
  describe('Login', () => {
        it('renders the login component', () => {
          const wrapper = renderLogin();
          wrapper.setState({ Email: '', Password: '' });
          expect(wrapper).toMatchSnapshot();
        });
        it('renders the login form', () => {
          const wrapper = renderLogin();
          expect(wrapper.find('form').length).toBe(1);
        });
    it('shows error message when login fails', () => {
      const authReducer = {
        errors: { error: 'Invalid email or password' },
        isAuthorized: false
      };
      const wrapper = renderLogin();
      wrapper.setProps({ authReducer });
    });
  });
});
