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
// Component React
// function HomePage() {
//   //JSX
//   return (
//     <div>
//       <GlobalStyle/>
//       <Titulo tag="h1">Boas vindas de voltage</Titulo>
//       <h2>Discord - Alura Matrix</h2>
//     </div>
//   );
// }
// export default HomePage

export default function PaginaInicial() {
  const [username, setUsername] = React.useState('rafaelfaragao');
  const roteamento = useRouter();
  //console.log(roteamento);

  return (
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
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[600],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function(event){
              event.preventDefault();
              console.log('Form Submitted')
              roteamento.push('/chat')
              //jeito de fazer se fosse uma página simples em HTML/CSS/JS
              //window.location.href = '/chat'
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            {/* <input
              type="text"
              value={username}
              onChange={function(event){
                //mostrar o valor que o usuario está digitando
                console.log('usuario digitou', event.target.value);
                //colocar o valor em uma variavel
                const valor = event.target.value;
                //trocar o valor no input ou setar o novo valor de username no React
                setUsername(valor);
              }}
            /> */}
            <TextField
              value={username}
              onChange={function(event){
                //mostrar o valor que o usuario está digitando
                console.log('usuario digitou', event.target.value);
                //colocar o valor em uma variavel
                const valor = event.target.value;
                //trocar o valor no input ou setar o novo valor de username no React
                setUsername(valor);
              }}
              fullWidth
              styleSheet={{ marginBottom: '8px'}}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={username.length > 1 && `https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username.length > 1 && username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}