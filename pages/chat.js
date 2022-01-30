import appConfig from "../config.json";
import React from "react";
import { useRouter } from "next/router";
import { Box, Button, Text, TextField, Image, Icon } from "@skynexui/components";
import { createClient } from '@supabase/supabase-js'

//process.env para usar variaveis locais
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMzNDc3MywiZXhwIjoxOTU4OTEwNzczfQ.yKM-1h28KB_k1_5MLZ_yNn7EfHsDVs_C4h9k6X6Pv10'
const SUPABASE_URL = 'https://sbychpthbhpcmygmbudy.supabase.co'

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default function PaginaDoChat() {
  //Usuario
  /*
  - Usuario digita no campo textarea
  - Aperta enter para Entrar
  - Tem que adicionar o texto na listagem

  // Dev
  - [x] Campo criado
  - [] Vamos usar o onChange usa o useState (ter if para caso seja enter pra limpar a variavel)
  - [] Lista de mensagens
  */

  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const respostaDaRota = useRouter();
  const user = respostaDaRota.query.user;
  //console.log(user);

  React.useEffect(() => {
    setLoading(true)
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        //console.log("Dados da consulta: ", data);
        setTimeout(() => {
          setListaDeMensagens(data);
          setLoading(false)
        }, 1500)
      })
  }, []);

  function handleNovaMensagem(usuario, novaMensagem) {
    const mensagem = {
      //id: listaDeMensagens.length + 1,
      de: usuario,
      texto: novaMensagem,
    };

    supabaseClient
      .from('mensagens')
      .insert([
        mensagem
      ])
      .then(({ data }) => {
        console.log('Criando mensagem: ', data);
        setListaDeMensagens([
          data[0],
          ...listaDeMensagens,
        ]);
      });

    setListaDeMensagens([
      mensagem,
      ...listaDeMensagens,
    ]);

    setMensagem("");
  }

  function handleExcluirMensagem(messageId) {
    //const listaSemAMensagem = listaDeMensagens.filter(excluida => excluida.id !== id)
    //setListaDeMensagens(listaSemAMensagem)
    supabaseClient
      .from('mensagens')
      .delete()
      .match({ id: messageId }).then((dataE) => {
        console.log("Mensagem deletada: ", dataE.data[0]);


        supabaseClient
          .from('mensagens')
          .select('*')
          .order('id', { ascending: false })
          .then(({ data }) => {
            //console.log("Dados da consulta: ", data);
            setListaDeMensagens(data);
          });
        testeDeSistema()
      });

  }

  function testeDeSistema() {
    console.log("Funcionou")
  }

  function Loader() {
    return (
      <>
        Loading messages...
        <Image
          styleSheet={{
            animation: "1.5s",
            width: "100%",
            height: "90%",

          }}
          src={'https://ps.w.org/matrix-pre-loader/assets/screenshot-4.gif'} />
      </>
    )
  }

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          color: appConfig.theme.colors.neutrals["000"],
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            borderRadius: "5px",
            backgroundColor: appConfig.theme.colors.neutrals[700],
            height: "100%",
            maxWidth: "95%",
            maxHeight: "95vh",
            padding: "32px",
          }}
        >
          <Header />
          <Box
            styleSheet={{
              position: "relative",
              display: "flex",
              flex: 1,
              height: "80%",
              backgroundColor: appConfig.theme.colors.neutrals[600],
              flexDirection: "column",
              borderRadius: "5px",
              padding: "16px",
            }}
          >
            {loading && Loader()}
            <MessageList mensagens={listaDeMensagens} excluirMensagem={handleExcluirMensagem} />

            {/* {listaDeMensagens.map((mensagemAtual) => {
              return (
                <li key={mensagemAtual.id}>
                  {mensagemAtual.de}: {mensagemAtual.texto}
                </li>
              )
            })} */}

            <Box
              as="form"
              styleSheet={{
                display: "flex",
                alignItems: "start",
              }}
            >
              <TextField
                value={mensagem}
                onChange={(event) => {
                  const valor = event.target.value;
                  setMensagem(valor);
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleNovaMensagem(user, mensagem);
                  }
                }}
                placeholder="Insira sua mensagem aqui..."
                type="textarea"
                styleSheet={{
                  width: "100%",
                  border: "0",
                  resize: "none",
                  borderRadius: "5px",
                  padding: "6px 8px",
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  marginRight: "12px",
                  color: appConfig.theme.colors.neutrals[200],
                }}
              />
              <Button
                type="button"
                label="OK"
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
                styleSheet={{
                  padding: "12px",
                }}
                onClick={() => {
                  handleNovaMensagem(user, mensagem)
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  //console.log(props);

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {

        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: "20px"
              }}
            >
              <Box
                styleSheet={{
                  marginBottom: "8px",
                }}
              >
                <Image
                  styleSheet={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                    hover: {
                      width: "40px",
                      height: "40px",
                    }
                  }}
                  src={`https://github.com/${mensagem.de}.png`}
                />
                <Text tag="strong">{mensagem.de}</Text>
                <Text
                  styleSheet={{
                    fontSize: "10px",
                    marginLeft: "8px",
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </Box>
              <Button
                iconName="trash"
                size="sm"
                variant="tertiary"
                buttonColors={{
                  contrastColor: appConfig.theme.colors.errors["000"],
                  mainColor: appConfig.theme.colors.primary[100],
                }}
                styleSheet={{
                  title: "Delete",
                }}
                onClick={() => {
                  props.excluirMensagem(mensagem.id)
                }}
              />
            </Box>
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}
