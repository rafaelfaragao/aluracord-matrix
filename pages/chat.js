import appConfig from "../config.json";
import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { Box, Button, Text, TextField, Image, Icon } from "@skynexui/components";
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

//process.env para usar variaveis locais
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMzNDc3MywiZXhwIjoxOTU4OTEwNzczfQ.yKM-1h28KB_k1_5MLZ_yNn7EfHsDVs_C4h9k6X6Pv10'
const SUPABASE_URL = 'https://sbychpthbhpcmygmbudy.supabase.co'

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function messagensEmTempoReal(setListaDeMensagens) {
  return supabaseClient
    .from('mensagens')
    .on('*', payload => {
      console.log("O que aconteceu:", payload)
      let bosta = supabaseClient
        .from('mensagens')
        .select('*')
        .order('id', { ascending: false })
        .then(({ data }) => {
          console.log("Dados da consulta: ", data)
          setListaDeMensagens(data)
        })
      return bosta
    }).subscribe()
}

export default function PaginaDoChat() {
  //Usuario
  /*
  - Usuario digita no campo textarea
  - Aperta enter para Entrar
  - Tem que adicionar o texto na listagem

  // Dev
  - [x] Campo criado
  - [x] Vamos usar o onChange usa o useState (ter if para caso seja enter pra limpar a variavel)
  - [x] Lista de mensagens
  */
  const respostaDaRota = useRouter();
  const usuarioLogado = respostaDaRota.query.user;
  const [usuario, setUsuario] = React.useState([])

  const [loading, setLoading] = React.useState(false);

  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  //console.log(usuarioLogado);

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
      });

    messagensEmTempoReal(setListaDeMensagens)

  }, []);

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${usuarioLogado}`)
      .then(response => response.json())
      .then(data => setUsuario(data))

    console.log(usuarioLogado)
  }, [usuarioLogado])

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      //id: listaDeMensagens.length + 1,
      de: usuarioLogado,
      texto: novaMensagem,
    };

    supabaseClient
      .from('mensagens')
      .insert([
        mensagem
      ])
      .then(({ data }) => {
        console.log('Criando mensagem nova: ', data);
        // setListaDeMensagens([
        //   data[0],
        //   ...listaDeMensagens,
        // ]);
      });

    setMensagem("");
  }

  function handleExcluirMensagem(messageId) {

    supabaseClient
      .from('mensagens')
      .delete()
      .match({ id: messageId }).then(() => {
        //console.log("Mensagem deletada: ", dataE.data[0], messageId);
        //const listaSemAMensagem = listaDeMensagens.filter(excluida => excluida.id !== messageId)
        //setListaDeMensagens(listaSemAMensagem)
      });

  }

  function testeDeSistema() {
    //console.log("Funcionou")
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ dataList }) => {
        console.log("Dados da consulta: ", dataList);
        return dataList
      });
  }

  //testeDeSistema()

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
          <Header user={usuario} />
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
                    handleNovaMensagem(mensagem);
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

              <ButtonSendSticker
                onStickerClick={(sticker) => {
                  handleNovaMensagem(`:sticker: ${sticker}`);
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
                  handleNovaMensagem(mensagem)
                }}
              />

            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function Header(props) {

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
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {props ?
            <>
              <Text variant="heading5">Chat: Aluracord - {props.user["name"]}</Text>
              <Text
                styleSheet={{
                  color: appConfig.theme.colors.primary["500"]
                }}
              >
                Login: {props.user["login"]} - Localidade: {props.user["location"]}
              </Text>
            </> :
            <>
              <Text variant="heading5">Chat: Aluracord</Text>
            </>}
        </Box>

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
            {mensagem.texto.startsWith(':sticker:')
              ? <Image
                styleSheet={{
                  masWidth: "100px",
                  maxHeight: "100px",

                }}
                src={mensagem.texto.replace(':sticker:', '')} /> //true
              : (mensagem.texto) //false
            }
          </Text>
        );
      })}
    </Box>
  );
}
