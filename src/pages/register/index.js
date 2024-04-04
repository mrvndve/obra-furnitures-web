import React, { useEffect } from 'react';
import {
  useNavigate, useParams
} from 'react-router-dom';
import { ROLE_ID } from '@utils';

import RegisterBuyer from './buyer';

const RegisterPage = () => {
  const navigate = useNavigate();

  const { role } = useParams();

  let roleId;

  switch(role) {
    case 'merchant':
      roleId = ROLE_ID.MERCHANT;
      break;
    case 'buyer':
      roleId = ROLE_ID.BUYER;
      break;
    default:
      roleId = null;
  }

  useEffect(() => {
    if (!roleId) {
      navigate('/*');
    }
  }, [roleId]);

  return <>
    {role === 'buyer' && (
      <RegisterBuyer {...{ roleId }} />
    )}
  </>;
};

export default RegisterPage;