<script>
    import Footer from "../../components/Footer.svelte";
    import NavBar from "../../components/NavBar.svelte";
    import ParallaxBg from "../../components/ParallaxBg.svelte";
    import Padding from "../../components/padding.svelte";

    let audioSrc = "https://cdn.jonasjones.dev/mp3/Jonas_Jones-bigger-banger.mp3";
</script>

<ParallaxBg>
    <title>About</title>
    <div class="container">
        <Padding />
        <NavBar />
        <h1>About</h1>
        <p class="text">
            Once upon a time, in the realm of technology, there emerged a tech
            prodigy named Jonas Jones. Jonas possessed an unparalleled passion
            for open-source software and a relentless pursuit of innovation. His
            vision extended beyond mere conquest; he sought to revolutionize the
            world with the power of Arch Linux, challenging the dominance of the
            reigning Windows empire.<br />
            Armed with his trusty 16-framework laptop, Jonas embarked on a quest
            to dismantle the barriers erected by Windows and liberate the digital
            landscape. With each line of code he crafted, the Arch Linux revolution
            grew stronger, captivating hearts and minds worldwide.<br />
            Jonas's expertise in the realm of Arch Linux was awe-inspiring. He possessed
            an encyclopedic knowledge of the command line, deftly navigating the
            intricate intricacies of the operating system. His coding skills were
            matched only by his indomitable spirit and unwavering dedication to the
            cause.<br />
            Word of Jonas's audacious mission spread like wildfire. From dimly lit
            hacker forums to bustling tech conferences, his name became synonymous
            with the Arch Linux uprising. Tech enthusiasts rallied behind him, inspired
            by his passion and unwavering belief in the power of open-source software.<br
            />
            As Jonas continued to advance his noble cause, the world felt the tremors
            of change. Corporations, governments, and individuals began embracing
            the freedom and security offered by Arch Linux. Its versatility and customizable
            nature proved to be a formidable weapon in the battle against proprietary
            software.<br />
            Windows, once considered an unassailable fortress, faced the relentless
            onslaught of Jonas's Arch Linux revolution. In a symphony of code and
            determination, Jonas dismantled the walls that had long confined users,
            empowering them to forge their own digital destinies.<br />
            The transformation was nothing short of extraordinary. Jonas's Arch Linux-powered
            empire began to flourish, fostering a vibrant community of like-minded
            individuals. They shared knowledge, collaborated on groundbreaking projects,
            and created a harmonious ecosystem where innovation thrived.<br />
            Yet, Jonas never lost sight of his humble beginnings. Amidst the rapid
            rise of his empire, he remained grounded, connecting with Arch Linux
            enthusiasts across the globe. His charisma and down-to-earth nature endeared
            him to the masses, inspiring a new generation of tech leaders driven
            by the principles of openness and collaboration.<br />
            And so, the world witnessed the ascent of Jonas Jones, the Arch Linux
            luminary, who, armed with his 16-framework laptop, embarked on a quest
            to topple the Windows kingdom and ignite a technological revolution.
            His journey taught us that with passion, knowledge, and the power of
            community, even the mightiest empires can be transformed.<br />
            <br />
            TL;DR: I asked ChatGPT.<br />
            Also, I like K-Pop.<br />
            I uSe ArCh BtW.
        </p>
        <audio controls>
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        <h1>Useful Links</h1>
        <a href="https://builds.jonasjones.dev">Old Builds</a><br />
        <a href="https://wiki.jonasjones.dev">Wiki</a><br />
        <h1>Greatest Acomplishment</h1>
        <p>
            A severity 7.5/10 rated CVE I received for a humble project of mine
            as the second ever CVE in Minecraft Modding history!
        </p>
        <a href="https://nvd.nist.gov/vuln/detail/CVE-2022-39221"
            >CVE-2022-39221</a
        >
        <Padding />
    </div>
    <Footer />
</ParallaxBg>

<style>
    .text {
        max-width: 1000px;
    }
</style>
