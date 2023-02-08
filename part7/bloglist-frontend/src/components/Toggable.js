import { useState, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Toggable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <Container>
      <div style={hideWhenVisible}>
        <Button variant="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        {console.log(props)}
        <Row style={{ marginTop: 5, marginLeft: 1 }}>
          <Col md={4}>
            <Button variant="secondary" onClick={toggleVisibility}>
              cancel
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
});

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

Toggable.displayName = 'Toggable';

export default Toggable;
