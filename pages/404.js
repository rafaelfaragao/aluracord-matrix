import appConfig from '../config.json';
import { Box, Button, Text, Image } from '@skynexui/components';
import { useRouter } from 'next/router'

export default function PageNotFound() {
  const roteamento = useRouter()
  return(
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.errors['000'],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: '100%', maxWidth: '400px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[600],
          }}
        >
         
            <Image
              styleSheet={{
                width: '250px',
                height: '250px',
                overflow: 'hidden',
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://www.meme-arsenal.com/memes/68eda4e5363a0c8494de37d4e29eed46.jpg`}
            />
            <Text
              styleSheet={{
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                color: appConfig.theme.colors.neutrals['100']
              }}
            >
              Matrix Error 404 - Você não devia estar aqui!
            </Text>
            <Button
              label="Volte para o caminho"
              type="text"
              fullWidth
              size="xl"
              onClick={function() {
                roteamento.push('/')
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: "red",
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
              styleSheet={{marginTop: '16px'}}
            />
        </Box>
      </Box>
    </>
  );
}