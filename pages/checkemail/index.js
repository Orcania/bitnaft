/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { toast } from 'react-toastify';

import api from 'src/api';

import styles from 'src/scss/common_modules/box.module.scss';

const { box_container_v } = styles;

const VerifyEmailPage = () => {
    const router = useRouter();
    const { email } = router.query;

    const [loading, setLoading] = useState(false);

    const handleResendEmail = async () => {
        setLoading(true);
        try {
            const res = await api.post.resendVerificationEmail({ email });

            if (res.data.success) {
                toast.success('Verification email sent again');
            }
        } catch (err) {
            toast.success(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="has-bg-md-ref-primary-10-oa-9" style={{ height: '100vh' }}>
            <div
                className="container is-max-desktop py-6 px-5"
                style={{ height: '100%', display: 'grid', placeItems: 'center' }}
            >
                <div className={`box ${box_container_v}`} style={{ height: '100%', maxHeight: '100%' }}>
                    <div className="is-flex is-flex-direction-column">
                        <section id="verify_email_title mb-6">
                            <h1 className="title is-4 has-text-hblue has-text-centered">Verify your email</h1>
                            <p className="has-text-centered">
                                Check your email for a verification message. If you don&apos;t see it click on{' '}
                                <code style={{ color: 'black' }}>Resend Email</code>
                            </p>
                        </section>
                        <section className="has-text-centered is-flex-grow-1">
                            <img src="media/pages/verifyemail/bg.webp" alt="" width="60%" />
                        </section>
                        <section className="has-text-centered">
                            <button
                                className={`button is-md-ref-primary-30 ${loading ? 'is-loading' : ''}`}
                                type="button"
                                onClick={handleResendEmail}
                            >
                                Resend email
                            </button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

VerifyEmailPage.getLayout = page => getPageTitleLayout(page, 'Please verify your email');

export default VerifyEmailPage;
