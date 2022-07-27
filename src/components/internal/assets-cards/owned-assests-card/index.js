/* eslint-disable react/no-array-index-key */
import Image from 'next/image';
import Link from 'next/link';
import NumberFormatter from 'src/utils/number-formatter';

const OwnedAssetsCard = props => {
    const { title, icon, amount, cryptoIcons, numberOfAssets, to } = props;

    return (
        <Link href={to}>
            <div className="box rounded-shadowed-box is-clickable">
                <div className="columns">
                    <div className="column is-flex is-flex-direction-flex-start is-align-items-center">
                        <span className="icon is-size-5">
                            <i className={`has-text-md-source-primary ${icon}`} />
                        </span>
                        <h1 className="subtitle is-size-5 has-text-md-source-primary has-font-roboto pl-2">{title}</h1>
                    </div>
                </div>
                <div className="columns">
                    <div className="column pt-0 is-narrow">
                        <p className="has-text-md-black has-font-pt-mono is-size-5" style={{ opacity: '75%' }}>
                            ${NumberFormatter(amount)}
                        </p>
                    </div>
                </div>
                <div className="columns pt-5">
                    <div className="column stacked-images is-flex">
                        {cryptoIcons.map(link => (
                            <figure className="image is-24x24" key={link}>
                                <Image className="is-rounded shadowed-logos" src={link} layout="fill" alt="" />
                            </figure>
                        ))}
                    </div>
                    <div className="column is-flex is-justify-content-flex-end is-align-items-center">
                        <p
                            className="is-size-7 has-text-md-black has-text-weight-bold has-font-roboto"
                            style={{ opacity: '75%' }}
                        >
                            {numberOfAssets === 0 ? 'No assets' : `${numberOfAssets} assets`}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default OwnedAssetsCard;