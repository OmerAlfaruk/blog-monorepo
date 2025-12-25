import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

type SubmitButtonProps = React.ComponentProps<typeof Button>;

 const SubmitButton = ({children,...props}: SubmitButtonProps) => {
    const { pending } = useFormStatus();
  return (
    <Button type='submit' aria-disabled={pending} {...props}>

      {pending ? 'Loading...' : children}
    </Button>
  )
}
export default SubmitButton;
