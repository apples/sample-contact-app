import Head from 'next/head';
import styles from '../../styles/dashboard/index.module.scss';
import { useCallback, useEffect, useMemo, useRef, useState, PropsWithChildren, ComponentType } from 'react';
import { fetchApi } from '../../lib/api';
import { useUser, UserInfo } from '../../lib/useUser';
import useSWR, { mutate } from 'swr';
import { Address, Person } from '@prisma/client';

const AddressTable = ({ addresses, onClose }: { addresses: Address[], onClose: () => void }) => {
    return <div className={styles.addressTable}>
        <div>
            <button type='button' onClick={onClose}>Close</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {addresses.map(a => <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{a.address}</td>
                </tr>)}
            </tbody>
        </table>
    </div>;
};

const AddressButton = ({ person_id }: { person_id: number }) => {
    const { data: addresses } = useSWR<Address[]>(`/api/address?person_id=${person_id}`);

    const [show, setShow] = useState(false);

    return <>
        <button type='button' onClick={addresses ? () => setShow(true) : undefined}>{addresses?.length ?? '?'}</button>
        {show && addresses && <AddressTable addresses={addresses} onClose={() => setShow(false)} />}
    </>;
};

const SortButtons = ({ name, setOrderBy, setOrder }: { name: string, setOrderBy: (x: string) => void, setOrder: (x: string) => void}) => {
    return <span className={styles.sortBtns}>
        <button type='button' onClick={() => { setOrderBy(name); setOrder('desc'); }}>v</button>
        <button type='button' onClick={() => { setOrderBy(name); setOrder('asc'); }}>^</button>
    </span>;
};

const PersonTable = () => {
    const take = 5;
    const [skip, setSkip] = useState(0);
    const [orderBy, setOrderBy] = useState('display_name');
    const [order, setOrder] = useState('desc');

    const { data: persons } = useSWR<Person[]>(`/api/persons?skip=${skip}&take=${take}&orderBy=${orderBy}&order=${order}`);

    const prevPage = () => {
        if (skip > 0) {
            setSkip((s) => s - take);
        }
    };

    const nextPage = () => {
        if (persons?.length === take) {
            setSkip((s) => s + take);
        }
    };

    if (!persons) {
        return <div>Loading persons...</div>;
    }

    return <div className={styles.table}>
        <table>
            <thead>
                <tr>
                    <th>Name <SortButtons name={'display_name'} setOrderBy={setOrderBy} setOrder={setOrder} /></th>
                    <th>First Name <SortButtons name={'first_name'} setOrderBy={setOrderBy} setOrder={setOrder} /></th>
                    <th>Last Name <SortButtons name={'last_name'} setOrderBy={setOrderBy} setOrder={setOrder} /></th>
                    <th>Email <SortButtons name={'email_address'} setOrderBy={setOrderBy} setOrder={setOrder} /></th>
                    <th>Date of Birth <SortButtons name={'date_of_birth'} setOrderBy={setOrderBy} setOrder={setOrder} /></th>
                    <th>Addresses</th>
                </tr>
            </thead>
            <tbody>
                {persons.map(p => <tr key={p.id}>
                    <td>{p.display_name}</td>
                    <td>{p.first_name}</td>
                    <td>{p.last_name}</td>
                    <td>{p.email_address ?? '-'}</td>
                    <td>{p.date_of_birth ?? '-'}</td>
                    <td><AddressButton person_id={p.id} /></td>
                </tr>)}
            </tbody>
        </table>
        <div className={styles.tableControls}>
            <button type='button' onClick={prevPage}>{'<-'}</button>
            <span className={styles.spacer} />
            <button type='button' onClick={nextPage}>{'->'}</button>
        </div>
    </div>;
};

const UserDashboard = ({ user, logout } : { user: UserInfo, logout: () => void }) => {
    return <>
        <div className={styles.flexHeader}>
            <div className={styles.flexPad} />
            <div className={`${styles.flexPad} ${styles.headerWelcome}`}>
                <h1>
                    Welcome to Sample Contact App, {user.username}!
                </h1>
            </div>
            <div className={`${styles.flexPad} ${styles.headerRight}`}>
                <button type='button' className={styles.logoutButton} onClick={logout}>Logout</button>
            </div>
        </div>

        <PersonTable />
    </>;
};

const UserSwitch = ({ user, logout }: { user: UserInfo | undefined, logout: () => void }) => {
    if (!user || !user.isLoggedIn) {
        return <div className={styles.card}>
            Loading...
        </div>;
    } else {
        return <UserDashboard user={user} logout={logout} />;
    }
};

export default function Dashboard() {
    const { user, mutateUser } = useUser({ redirectTo: '/login' });

    const logout = useCallback(() => {
        mutateUser(fetchApi('/api/logout'));
    }, [mutateUser]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Sample Contact App</title>
                <meta name="description" content="Sample Contact App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <UserSwitch user={user} logout={logout} />
            </main>
        </div>
    );
}
