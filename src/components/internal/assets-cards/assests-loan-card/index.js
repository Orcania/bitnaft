import Image from 'next/image';
import Link from 'next/link';

import formatDate from 'src/utils/format-date';

const LoanedAssetsCard = props => {
    const { title, icon, amount, cryptoIcon, numberOfLoanedAssets, to, payBeforeDate } = props;

    return (
        <Link href={to}>
            <div className="box rounded-shadowed-box is-clickable min-w-250">
                <div className="columns mb-0">
                    <div className="column is-flex is-justify-content-flex-start is-align-items-center">
                        <span className="icon is-size-5">
                            <i className={`has-text-md-source-primary ${icon}`} />
                        </span>
                        <h1 className="subtitle is-size-5 has-text-md-source-primary has-font-roboto pl-2">{title}</h1>
                    </div>
                </div>
                <div className="columns mb-0 is-gapless is-mobile">
                    <div className="column is-narrow is-flex is-narrow">
                        <p className="has-text-md-black-o-7 has-font-roboto is-size-6">Last Asset Borrowed</p>
                    </div>
                    <div
                        className="column is-narrow is-flex is-flex-direction-column is-align-items-flex-end"
                        style={{ marginLeft: '-0.5rem' }}
                    >
                        <p className="is-size-7 is-underlined has-text-md-black-o-7 has-text-weight-light has-font-roboto pb-2">
                            Pay Before
                        </p>
                        <p className="is-size-6 has-text-md-black-o-7 has-text-weight-light has-font-roboto">
                            {formatDate(payBeforeDate)}
                        </p>
                    </div>
                </div>
                <div className="columns mb-0 is-mobile">
                    <div
                        className="column is-flex is-justify-content-flex-start is-align-items-center"
                        style={{ marginTop: '-0.5rem' }}
                    >
                        <figure className="image is-24x24">
                            <Image className="is-rounded shadowed-logo" src={cryptoIcon} layout="fill" alt="" />
                        </figure>
                        <h1 className="subtitle is-size-5 has-text-md-black-o-7 has-font-pt-mono pl-2">{amount}</h1>
                    </div>
                </div>
                <div className="columns is-mobile pt-2">
                    {numberOfLoanedAssets === 0 ? (
                        <p className="is-size-7 has-text-md-black-o-7 has-text-weight-bold has-font-roboto">No loans</p>
                    ) : (
                        <div className="column is-flex is-justify-content-flex-start">
                            <p className="is-size-7 has-text-md-black-o-7 has-text-weight-bold has-font-roboto">
                                Current loans
                            </p>
                            <p className="is-size-7 has-text-md-black-o-7 has-text-weight-bold has-font-pt-mono pl-3">
                                {numberOfLoanedAssets}
                                <span className="has-font-roboto"> asset(s)</span>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default LoanedAssetsCard;
