import Head from "next/head";
export default function Index() {
    return <>
        <Head>
            <title>About Me - IK.AM</title>
        </Head>
        <h2>About Me</h2>
        <img src={"https://avatars2.githubusercontent.com/u/106908?s=200"} width={180}
             height={180}
             alt="@making"
             className="rounded-md"/>
        <h3>Name</h3>
        <p>Toshiaki Maki / 槙 俊明</p>
        <p>having a dog 🐩 (<a href="https://en.wikipedia.org/wiki/Bichon_Frise">Bichon
            Frise</a>). Lemon&nbsp;🍋 is her name-o :)</p>
        <h3>Twitter</h3>
        <p><a href="https://twitter.com/making">@making</a></p>
        <h3>Email</h3>
        <p>makingx@gmail.com</p>
        <h3>Work Experience</h3>
        <dl>
            <dt>Apr 2020 - Present</dt>
            <dd>Staff Solutions Architect at <a href={'https://www.vmware.com'}>VMware</a>,
                Tokyo
            </dd>
            <dt>Sep 2018 - Apr 2020</dt>
            <dd>Advisory Solutions Architect at <a href={'https://pivotal.io'}>Pivotal</a>,
                Tokyo
            </dd>
            <dt>Jan 2016 - Aug 2018</dt>
            <dd>Senior Solutions Architect at <a href={'https://pivotal.io'}>Pivotal</a>,
                Tokyo
            </dd>
            <dt>Apr 2009 - Dec 2015</dt>
            <dd><a href={'https://www.nttdata.com'}>NTTDATA</a>, Tokyo</dd>
        </dl>
        <h3>Education</h3>
        <dl>
            <dt>Apr 2007 - Mar 2009</dt>
            <dd>MS, Mechano-Informatics at <a href={'https://www.i.u-tokyo.ac.jp/'}>The
                University of Tokyo</a>
            </dd>
            <dt>Apr 2003 - Mar 2007</dt>
            <dd>BS, Mechano-Informatics at <a href={'https://www.u-tokyo.ac.jp/'}>The
                University of Tokyo</a></dd>
        </dl>
    </>;
}