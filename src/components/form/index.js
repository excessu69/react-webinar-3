import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';

function Form({ title, onSubmit, children, submitTitle }) {
  const cn = bem('Form');

  return (
    <form className={cn()} onSubmit={onSubmit}>
      <h2 className={cn('title')}>{title}</h2>
      {children}
      <Button style="primary" type="submit" title={submitTitle} />
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  submitTitle: PropTypes.string,
};

export default memo(Form);
