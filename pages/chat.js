import appConfig from '../config.json';
import React from 'react';
import { useRouter } from 'next/router'
import { Box, Button, Text, TextField, Image } from '@skynexui/components';

function Titulo(props){
  const Tag = props.tag || 'h1';
  return(
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}

export default function PaginaDoChat() {
  return(
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '1000px', height: '100%', maxHeight: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[600],
          }}
        >
          <Titulo>Página do Chat</Titulo>
        </Box>
      </Box>
    </>
  );
}