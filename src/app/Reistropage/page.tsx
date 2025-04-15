import Head from "next/head";
import Link from 'next/link';
import Headrp from "@/componentes/Headerp";
import "./Reistro.css";

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
       <link rel="stylesheet" href="/globals.css" />
        <link rel="stylesheet" href="/styleguide.css" />
        <link rel="stylesheet" href="/style.css" />
        <title>PostMe</title>
      </Head>
      <Headrp />
      <div className="desktop">
        
        <div className="div">
          <div className="frame">  
          </div>
          <div className="overlap">
            <div className="overlap-group">
              <img className="whatsapp-image" src="/inicio1.png" />
              <div className="component">
                <div className="overlap-group-2">
                  <img className="LOGO-prev-ui" src="/LOGO.svg" />
                  <div className="text-wrapper-4">P</div>
                  <div className="text-wrapper-5">ST</div>
                </div>
              </div>
              <div className="me"><div className="text-wrapper-6">Me</div></div>
              <div className="rectangle"></div>
              <div className="LOGO-prev-ui-wrapper"><img className="img" src="/logomini.png" /></div>
              <div className="frame-2">
                <div className="frame-3">
                  <img className="thumb-up-fill" src="/likemini.png" />
                  <div className="text-wrapper-7">Me gusta</div>
                </div>
                <div className="frame-4">
                  <img className="message-fill" src="/comnetmini.png" />
                  <div className="text-wrapper-8">Comentar</div>
                </div>
              </div>
              <div className="post-me"><div className="text-wrapper-9">Post me</div></div>
              <div className="solo-para"><div className="solo-para-2">Solo Para....universitarios&nbsp;&nbsp; XD</div></div>
            </div>
            <div className="background-shadow-2"><div className="text-wrapper-10">COMENZAR</div></div>
          </div>
        </div>
      </div>
    </>
  );
}
