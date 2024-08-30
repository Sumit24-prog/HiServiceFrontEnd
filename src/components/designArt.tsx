import designArtStyle from "../styles/designArt.module.css";

const DesignArt = () => {
    return (
        <div className={designArtStyle.designArt}>
            <div className={designArtStyle.triangle}></div>
            <div className={designArtStyle.triangle2}></div>
            <div className={designArtStyle.triangle1}></div>
        </div>
    );
};

export default DesignArt;
