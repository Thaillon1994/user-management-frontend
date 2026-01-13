import React from 'react';
import { isAdmin } from '../utils/auth';

export default function AdminOnly({ children }) {
  if (!isAdmin()) {
    return (
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#f8d7da', 
        color: '#721c24', 
        border: '1px solid #f5c6cb', 
        borderRadius: '4px',
        margin: '1rem 0'
      }}>
        <strong>Acesso Restrito:</strong> Apenas administradores podem acessar esta função.
      </div>
    );
  }
  return children;
}