--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: insertdatacustomer(json); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.insertdatacustomer(IN data json)
    LANGUAGE plpgsql
    AS $$
	declare new_user_id int;
Begin

	with user_id as(
	insert into public.users(username, password)
		select username, password from json_to_recordset(data) customer
		(
			username varchar,
			password text
		)
		returning id
	)
	
	select id into new_user_id from user_id;
	
	insert into customer(firstname, lastname, user_id)
	select firstname, lastname,new_user_id from json_to_recordset(data) customer
	(
		firstname varchar,
		lastname varchar,
		user_id int
	);


end

$$;


ALTER PROCEDURE public.insertdatacustomer(IN data json) OWNER TO postgres;

--
-- Name: insertorderdetail(json, json); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.insertorderdetail(IN data1 json, IN data2 json)
    LANGUAGE plpgsql
    AS $$
declare new_order_id int;

BEGIN
with order_id as(
insert into public.orders(user_id,totalproduct,totalprice)
	select x.user_id, x.totalproduct, x.totalprice from json_to_recordset(data1) x
	(
		user_id int, totalproduct int, totalprice int
	)
returning id)
select id into new_order_id from order_id;

insert into order_detail(order_id,product_id,quantity)
select new_order_id, x.product_id, x.quantity from json_to_recordset(data2) x
(
	order_id int, product_id int,quantity int
);

END
$$;


ALTER PROCEDURE public.insertorderdetail(IN data1 json, IN data2 json) OWNER TO postgres;

--
-- Name: updateorder(json, json); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.updateorder(IN data json, IN data2 json)
    LANGUAGE plpgsql
    AS $$
DECLARE
	rows record;
	r record;
	dt record;
begin
	begin
		SELECT * from json_to_recordset(data2) as y(id int, totalproduct int, totalprice int) into dt;
		update orders set totalproduct = dt.totalproduct, totalprice = dt.totalprice where id=dt.id returning id 
		into rows;
	For r IN select * from json_to_recordset(data) as x(id int,quantity int)
	LOOP
		update order_detail set quantity = r.quantity where id=r.id;
			if not found or rows is null then
				rollback;
					raise 'ID tidak ditemukan';
			else
			commit;
			end if;
			END LOOP;
		end;
end;
$$;


ALTER PROCEDURE public.updateorder(IN data json, IN data2 json) OWNER TO postgres;

--
-- Name: updateorder_updatevz(json, json); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.updateorder_updatevz(IN data json, IN data2 json)
    LANGUAGE plpgsql
    AS $$
declare 
	rows record;
	orderId int;
	order_record record;
begin
	select * from json_to_recordset(data2) as y (id int,totalproduct int, totalprice int) into order_record;
	update orders set totalproduct=order_record.totalproduct, totalprice=order_record.totalprice 
	where id=order_record.id 
	returning id into rows;
	
	insert into order_detail (order_id,product_id,quantity) 
	select order_record.id,x.product_id,x.quantity
	from json_to_recordset(data) as x (order_id int,product_id int, quantity int);
end;
$$;


ALTER PROCEDURE public.updateorder_updatevz(IN data json, IN data2 json) OWNER TO postgres;

--
-- Name: updateordervz(json, json); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.updateordervz(IN data json, IN data2 json)
    LANGUAGE plpgsql
    AS $$
declare
	rows record;
	r record;
	dt record; --orders id
begin
	begin
		select * from json_to_recordset(data2) as y(id int, totalproduct int, totalprice int) into dt;
		update orders set totalproduct=dt.totalproduct, totalprice=dt.totalprice where id=dt.id returning id
			into rows;
		FOR r IN select * from json_to_recordset(data) as x(product_id int, quantity int)
		LOOP
			update order_detail set quantity=r.quantity where order_id=dt.id and product_id=r.product_id;
				if not found or rows is null then
					rollback;
						raise 'Id tidak ditemukan';
				else
				commit;
				end if;
				END LOOP;
				end;			
end;
$$;


ALTER PROCEDURE public.updateordervz(IN data json, IN data2 json) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customer (
    id integer NOT NULL,
    firstname character varying(100) NOT NULL,
    lastname character varying(100) NOT NULL,
    user_id integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.customer OWNER TO postgres;

--
-- Name: customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customer_id_seq OWNER TO postgres;

--
-- Name: customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customer_id_seq OWNED BY public.customer.id;


--
-- Name: order_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_detail (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.order_detail OWNER TO postgres;

--
-- Name: order_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_detail_id_seq OWNER TO postgres;

--
-- Name: order_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_detail_id_seq OWNED BY public.order_detail.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    totalproduct integer NOT NULL,
    totalprice integer NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(200) NOT NULL,
    category_id integer NOT NULL,
    price numeric NOT NULL,
    image_character character varying(200),
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_category (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(200) NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.product_category OWNER TO postgres;

--
-- Name: product_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_category_id_seq OWNER TO postgres;

--
-- Name: product_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_category_id_seq OWNED BY public.product_category.id;


--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(100) NOT NULL,
    password text NOT NULL,
    createdat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updatedat timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    roles character varying(200)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: selectusercustomer; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.selectusercustomer AS
 SELECT users.username,
    customer.firstname,
    customer.lastname
   FROM (public.users
     JOIN public.customer ON ((customer.user_id = users.id)));


ALTER TABLE public.selectusercustomer OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: vieworderswithalldetail; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.vieworderswithalldetail AS
 SELECT orders.id AS idpesanan,
    orders.user_id AS userid,
    concat(customer.firstname, ' ', customer.lastname) AS fullname,
    product.name AS namabarang,
    product.description AS deskripsibarang,
    order_detail.quantity AS jumlahbarang,
    product_category.name AS kategoribarang,
    product_category.description AS deskripsikategori
   FROM (((((public.orders
     JOIN public.order_detail ON ((orders.id = order_detail.order_id)))
     JOIN public.users ON ((orders.user_id = users.id)))
     JOIN public.customer ON ((customer.user_id = users.id)))
     JOIN public.product ON ((order_detail.product_id = product.id)))
     JOIN public.product_category ON ((product.category_id = product_category.id)));


ALTER TABLE public.vieworderswithalldetail OWNER TO postgres;

--
-- Name: viewselectproductcategorywithchild; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.viewselectproductcategorywithchild AS
 SELECT product_category.name AS category,
    product.name AS nama_produk,
    product.description AS deskripsi
   FROM (public.product_category
     JOIN public.product ON ((product_category.id = product.category_id)));


ALTER TABLE public.viewselectproductcategorywithchild OWNER TO postgres;

--
-- Name: viewselectuserscustomer; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.viewselectuserscustomer AS
 SELECT users.username,
    customer.firstname,
    customer.lastname
   FROM (public.users
     JOIN public.customer ON ((users.id = customer.user_id)));


ALTER TABLE public.viewselectuserscustomer OWNER TO postgres;

--
-- Name: viewselectuserscustomerwithid; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.viewselectuserscustomerwithid AS
 SELECT users.id,
    users.username,
    customer.firstname,
    customer.lastname
   FROM (public.users
     JOIN public.customer ON ((users.id = customer.user_id)));


ALTER TABLE public.viewselectuserscustomerwithid OWNER TO postgres;

--
-- Name: customer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer ALTER COLUMN id SET DEFAULT nextval('public.customer_id_seq'::regclass);


--
-- Name: order_detail id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail ALTER COLUMN id SET DEFAULT nextval('public.order_detail_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: product_category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_category ALTER COLUMN id SET DEFAULT nextval('public.product_category_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customer (id, firstname, lastname, user_id, createdat, updatedat) FROM stdin;
82	abuhakam	abuhakam	85	2023-05-26 08:23:52.210695	2023-05-26 08:23:52.210695
81	utbah123updated123456	utbah123updated123456	84	2023-05-26 07:47:46.096183	2023-05-26 07:47:46.096183
17	loginmanis1	manislogin1	18	2023-05-04 08:23:00.341679	2023-05-04 08:23:00.341679
22	ramzi3	jumair3	25	2023-05-09 07:48:53.227187	2023-05-09 07:48:53.227187
23	ramzi	jumair	26	2023-05-09 09:24:41.76357	2023-05-09 09:24:41.76357
24	ramzi5	jumair5	27	2023-05-09 09:26:02.491306	2023-05-09 09:26:02.491306
26	rinslet	lauren	29	2023-05-10 06:34:50.554807	2023-05-10 06:34:50.554807
18	ramziupdated	jumairupdated	19	2023-05-04 08:58:31.538576	2023-05-04 08:58:31.538576
1	ai22	2	4	2023-04-17 04:35:52.285236	2023-04-17 04:35:52.285236
2	ai22	2	4	2023-05-03 15:48:05.742646	2023-05-03 15:48:05.742646
39	abu	zubair	42	2023-05-20 15:55:29.26837	2023-05-20 15:55:29.26837
6	agsdadjgk	asdgasdgajsd	7	2023-05-04 02:39:08.706919	2023-05-04 02:39:08.706919
7	abdul1	aziz1	8	2023-05-04 02:40:55.600683	2023-05-04 02:40:55.600683
45	jewiorjweirojwerio	wirjeoijreoijreoir	48	2023-05-20 17:25:20.905713	2023-05-20 17:25:20.905713
49	jiwjeruiewjruewr	ewurhuweirheuirhter	52	2023-05-20 17:31:20.94404	2023-05-20 17:31:20.94404
10	abdul45updated1	aziz45updated1	11	2023-05-04 02:41:39.663616	2023-05-04 02:41:39.663616
41	wewiejiwjeupdated	wejiwjiwejrupdated	44	2023-05-20 15:59:59.068128	2023-05-20 15:59:59.068128
52	NEXTJS	SENGGOL	55	2023-05-22 10:23:41.772765	2023-05-22 10:23:41.772765
53	NEXTJS	SENGGOL	56	2023-05-22 10:23:42.798025	2023-05-22 10:23:42.798025
54	NEXTJS	SENGGOL	57	2023-05-22 10:23:42.960178	2023-05-22 10:23:42.960178
55	NEXTJS	SENGGOL	58	2023-05-22 10:23:43.133856	2023-05-22 10:23:43.133856
56	NEXTJS	SENGGOL	59	2023-05-22 10:23:43.310857	2023-05-22 10:23:43.310857
57	NEXTJS	SENGGOL	60	2023-05-22 10:24:12.851764	2023-05-22 10:24:12.851764
58	werewrw	werwrwer	61	2023-05-22 13:14:14.09173	2023-05-22 13:14:14.09173
59	werewrw	werwrwer	62	2023-05-22 13:14:14.56872	2023-05-22 13:14:14.56872
60	werewrw	werwrwer	63	2023-05-22 13:14:14.958533	2023-05-22 13:14:14.958533
61	werewrw	werwrwer	64	2023-05-22 13:14:15.159667	2023-05-22 13:14:15.159667
62	werewrw	werwrwer	65	2023-05-22 13:14:17.988086	2023-05-22 13:14:17.988086
63	werewrw	werwrwer	66	2023-05-22 13:14:18.170624	2023-05-22 13:14:18.170624
64	werewrw	werwrwer	67	2023-05-22 13:14:18.351976	2023-05-22 13:14:18.351976
65	werewrw	werwrwer	68	2023-05-22 13:15:05.952177	2023-05-22 13:15:05.952177
66	werewrw	werwrwer	69	2023-05-22 13:15:06.964741	2023-05-22 13:15:06.964741
67	werewrw	werwrwer	70	2023-05-22 13:15:07.100912	2023-05-22 13:15:07.100912
68	werewrw	werwrwer	71	2023-05-22 13:15:07.237737	2023-05-22 13:15:07.237737
69	werewrw	werwrwer	72	2023-05-22 13:15:07.506817	2023-05-22 13:15:07.506817
70	akjs	a	73	2023-05-22 13:16:17.627666	2023-05-22 13:16:17.627666
71	zubair5	zubair5	74	2023-05-22 13:43:47.136256	2023-05-22 13:43:47.136256
72	zubair5	zubair5	75	2023-05-22 13:51:58.193625	2023-05-22 13:51:58.193625
73	popo	pop	76	2023-05-22 14:00:16.235189	2023-05-22 14:00:16.235189
74	Invoker	Dota2	77	2023-05-22 14:00:55.43353	2023-05-22 14:00:55.43353
76	rUSA	KIJANG	79	2023-05-22 14:08:45.250904	2023-05-22 14:08:45.250904
77	zubair123456	zubair123456	80	2023-05-23 04:48:25.176515	2023-05-23 04:48:25.176515
78	abujahal	abujahal	81	2023-05-23 08:10:21.424991	2023-05-23 08:10:21.424991
14	aziss	test	15	2023-05-04 02:42:25.134448	2023-05-04 02:42:25.134448
75	abujahalupdated34	abujahalupdated34	78	2023-05-22 14:03:37.337643	2023-05-22 14:03:37.337643
15	azis	aziz9	16	2023-05-04 02:42:42.934319	2023-05-04 02:42:42.934319
80	cobainibro	cobainibro	83	2023-05-25 13:04:28.297565	2023-05-25 13:04:28.297565
79	bagasupdated	bagasupdated	82	2023-05-25 12:59:40.201432	2023-05-25 12:59:40.201432
\.


--
-- Data for Name: order_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_detail (id, order_id, product_id, quantity, createdat, updatedat) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, totalproduct, totalprice, createdat, updatedat) FROM stdin;
2	8	5	125000	2023-05-04 03:54:34.562182	2023-05-04 03:54:34.562182
1	7	5	125000	2023-05-04 03:51:06.836446	2023-05-04 03:51:06.836446
4	4	10	275000	2023-05-07 16:31:53.83279	2023-05-07 16:31:53.83279
5	8	5	225000	2023-05-10 14:27:26.917538	2023-05-10 14:27:26.917538
6	8	5	225000	2023-05-10 15:31:26.485707	2023-05-10 15:31:26.485707
7	4	8	280000	2023-05-10 15:33:03.618004	2023-05-10 15:33:03.618004
3	8	99	99	2023-05-04 07:30:31.543759	2023-05-04 07:30:31.543759
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, description, category_id, price, image_character, createdat, updatedat) FROM stdin;
39	Figure Ichigo	Figure Terbaik yang di perebutkan semua orang	1	1500000	Product-1684721285846-figure_ichigo.jpeg	2023-05-21 17:15:44.171374	2023-05-21 17:15:44.171374
41	Jus Lemon	Jus Lemon Produk Code X Academy	2	20000	Product-1684776180536-jus lemon.jpeg	2023-05-22 17:23:00.623001	2023-05-22 17:23:00.623001
42	Jus Tomat	Jus Tomat Code X Academy	2	15000	Product-1684777231273-jus tomat.jpg	2023-05-22 17:40:31.330788	2023-05-22 17:40:31.330788
43	Galamai Payakumbuah	Galamai Payakumbuah	2	30000	Product-1684777329461-galamai Payakumbuh.jpeg	2023-05-22 17:42:09.522437	2023-05-22 17:42:09.522437
44	Rinuak Maninjau	Rinuak Terbaik Khas Sumatera Barat	2	50000	Product-1684777489532-Goreng Rinuak Maninjau.jpg	2023-05-22 17:44:49.61292	2023-05-22 17:44:49.61292
45	Sala Lauak	Sala Lauak Khas Minang Kota Pariaman	2	25000	Product-1684827299712-sala lauak padang.jpg	2023-05-23 07:34:59.787817	2023-05-23 07:34:59.787817
46	Nasi Kapau	Nasi Kapau sabana Lamak Khas Bukittinggi	2	50000	Product-1684827369613-gambar nasi kapau.jpeg	2023-05-23 07:36:09.709667	2023-05-23 07:36:09.709667
47	Wajik Payakumbuah	Wajik Lamak Khas Payakumbuah Minang Sumatera Barat	2	30000	Product-1684827986225-wajik-payakumbuah.jpeg	2023-05-23 07:46:26.309815	2023-05-23 07:46:26.309815
48	Jus Mangga	Jus Mangga Produk Khas Code X Academy	2	25000	Product-1684828233479-jus mangga.jpeg	2023-05-23 07:50:33.567189	2023-05-23 07:50:33.567189
49	Krabby Patty	KrabbyPatty Produk Krusty Krab Bikini Bottom	2	35000	Product-1684828485027-Krabby Patty.jpg	2023-05-23 07:54:45.162552	2023-05-23 07:54:45.162552
50	Sanjai Balado	Sanjai Balado Khas Bukittinggi	2	25000	Product-1684828640274-sanjai-balado.jpeg	2023-05-23 07:57:20.371645	2023-05-23 07:57:20.371645
51	Jus Kiwi	Jus Kiwi Produk khas Code X Academy	2	20000	Product-1684828798072-jus kiwi.jpg	2023-05-23 07:59:58.158863	2023-05-23 07:59:58.158863
52	Figure Luffy	Figure Langka Bertanda Tangan Oda-Sensei yang di perebutkan semua penggemar One Piece di dunia ini	1	2000000	Product-1684912271528-figure_luffy.jpg	2023-05-24 07:11:11.647437	2023-05-24 07:11:11.647437
53	Jus Anggur	Jus Anggur Buatan Code X Academy	2	40000	Product-1685092791775-jus anggur.jpg	2023-05-26 08:23:13.964755	2023-05-26 08:23:13.964755
\.


--
-- Data for Name: product_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_category (id, name, description, createdat, updatedat) FROM stdin;
1	figure	merupakan produk yang berisi sebuah replika mainan dari suatu tokoh kartun	2023-05-03 15:19:05.029924	2023-05-03 15:19:05.029924
2	Makanan Halal	Kumpulan Makanan Halal Dan Thoyyiba yang menyehatkan dan di ridhoi oleh Allah	2023-05-03 14:29:06.474509	2023-05-03 14:29:06.474509
3	Makanan Haram	Kumpulan Makanan Haram yang di larang dalam agama Islam	2023-05-03 14:29:56.80585	2023-05-03 14:29:56.80585
4	Minuman	Kumpulan Minuman Yang telah menemani Manusia	2023-05-04 02:55:28.113421	2023-05-04 02:55:28.113421
5	category Versi 1	Ini adalah deskripsi category Versi 1	2023-05-07 05:30:16.115104	2023-05-07 05:30:16.115104
7	Categori Versi 2	Ini adalah deskripsi Categori Versi 2	2023-05-09 10:07:01.371149	2023-05-09 10:07:01.371149
9	produkcoba1	deskripwqjdwjweuhewjrh	2023-05-10 04:03:10.984438	2023-05-10 04:03:10.984438
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, createdat, updatedat, roles) FROM stdin;
7	rehan ganteng	$2b$10$fmNSy5YkcQOD9knwUavRhu4QWRasY92uLgWDDVvdaj8l0Sp7Fg4UW	2023-05-04 02:39:08.706919	2023-05-04 02:39:08.706919	\N
8	awikwok	$2b$10$YPTP4lAv5d7wCqRxtxwiP.oQKwQB7B6D628xFyiz620Rk.nlj33a2	2023-05-04 02:40:55.600683	2023-05-04 02:40:55.600683	\N
18	cubologin2	$2b$10$hVP52rgw2PprtXf1xAi8E.s02MVsyNFWlZKs5yUKfLASneuF/FyHW	2023-05-04 08:23:00.341679	2023-05-04 08:23:00.341679	\N
72	qeqwerw	$2b$10$IGOcLkRzpmh7KhAGZbWS5ORB8cPRcety8CaRgK69Rl4CuN9km6AxO	2023-05-22 13:15:07.502698	2023-05-22 13:15:07.502698	\N
25	ramzi2013	$2b$10$4uYdf4TE1nShwGh6dsIXGuNdsSfE.BB9m/RMDCdziDJuhjawZXv4G	2023-05-09 07:48:53.223313	2023-05-09 07:48:53.223313	\N
26	ramzi2011	$2b$10$g1aj9BSNbkxpFV/.cBoiYuuX1kGHPivzxP7q4ixJq6U7y4rQ2fv7S	2023-05-09 09:24:41.757859	2023-05-09 09:24:41.757859	\N
27	ramzi2015	$2b$10$/qguA/P/NrvYR0oGhsIFu.YoKmnVqjxSXdLNyZbhUD8i5FTyx9KUS	2023-05-09 09:26:02.485182	2023-05-09 09:26:02.485182	\N
29	rinslet1999	$2b$10$POwRLv2d6ElkusW3hqHiQeGpF1wTYQi7Sr6bMYNzBFNqY9oMnJDhq	2023-05-10 06:34:50.546185	2023-05-10 06:34:50.546185	\N
48	wjrioejroiejio	$2b$10$NvfP76OE13ZK6KtGrcArYubvzDGxODD8aBVrGjwK/BBlXuxQUD3vS	2023-05-20 17:25:20.900939	2023-05-20 17:25:20.900939	\N
19	ramziupdated	$2b$10$Ck8qgP/ye9O.8KPYdtehPuheIIzO.D3Jnnxd81v7pRzOFgqcRJlje	2023-05-04 08:58:31.538576	2023-05-04 08:58:31.538576	\N
52	jmfenrerkqj	$2b$10$n3KmZB.R2SflGzU46ryT7uGMEKu2z5f1s8RVuDz11RRA9qEeT9Rq2	2023-05-20 17:31:20.939591	2023-05-20 17:31:20.939591	\N
4	oshinoko1	$2b$10$dOZj/YggP6kl9zpFPgjQE.rrPhjvFBFeEQUgGkjFKEAHzE5U/Wbxu	2023-04-17 04:35:52.285236	2023-04-17 04:35:52.285236	admin
73	kaji	$2b$10$W9HOi7rapY80spamnWsR.ukTQYykg6K7F1.x5knoWHPqE3e86M9..	2023-05-22 13:16:17.613655	2023-05-22 13:16:17.613655	\N
42	abuzubair	$2b$10$XxU9SJLc.wcsqs5Fy3yhzeskkCUIiELWgngqkosUUny50uK83SBb.	2023-05-20 15:55:29.251076	2023-05-20 15:55:29.251076	\N
74	zubair5	$2b$10$qmvtYUYi3MLAahwrcwg1aOGXhH9hdo8og736aHzemNkEvJFpEDn9K	2023-05-22 13:43:47.130971	2023-05-22 13:43:47.130971	\N
11	azizganteng45updated1	$2b$10$0EIFwWVgvesi0P6bAsvJNeK78fa8dfI57c9GiFEk5bbJnnfdfvR4i	2023-05-04 02:41:39.663616	2023-05-04 02:41:39.663616	\N
44	eduewhupdated	$2b$10$rjO0Ipfaez5vr9iqOHHGLur/xY.RTch0dJxIEkfy0epgC8nb6Qfrm	2023-05-20 15:59:59.059215	2023-05-20 15:59:59.059215	\N
55	NextJSnihBoss	$2b$10$btFuhitrbz7MTaUqYe4C9.4wUuBdQ2Ol95VvMZFTHGTzMEiXkYJ9K	2023-05-22 10:23:41.748039	2023-05-22 10:23:41.748039	\N
56	NextJSnihBoss	$2b$10$wOmz9A8pSmQzMAr8aTcq5O8zX42omt5FKxqYVNtmbb/wcB4plpSd6	2023-05-22 10:23:42.793378	2023-05-22 10:23:42.793378	\N
57	NextJSnihBoss	$2b$10$TqTBox8Hnq4WULUVSH4eguhG6E3qWMJtlRwqhU26PSFut3JQykItK	2023-05-22 10:23:42.955336	2023-05-22 10:23:42.955336	\N
58	NextJSnihBoss	$2b$10$7vZ3hHnl3VkBob78WK9PkuJrjd3VMAzZa4JWYq6lYveVZXZdzCm8O	2023-05-22 10:23:43.129719	2023-05-22 10:23:43.129719	\N
59	NextJSnihBoss	$2b$10$PrPaT0YhZKZ0X9dsVa0Huu0Y8eBN3dOcwOcR7nq4ItTK/Lblsokle	2023-05-22 10:23:43.305203	2023-05-22 10:23:43.305203	\N
60	NextJSnihBoss	$2b$10$z.JIgPk3oEVhFaByTOKIAeebVau.g6VAjdBHPMwnMKaPBiKQ9WtWC	2023-05-22 10:24:12.846344	2023-05-22 10:24:12.846344	\N
61	qeqwerw	$2b$10$AOoozJV2NBk3JkwsQdGaNezKK.n5gxYOnErU6g8xi2kxQRt737m2y	2023-05-22 13:14:14.084733	2023-05-22 13:14:14.084733	\N
62	qeqwerw	$2b$10$VnvHt7iPYkKw13RbeckqVOxFTGR93YiRb4x.na06MBr5to0BIQHA.	2023-05-22 13:14:14.564905	2023-05-22 13:14:14.564905	\N
63	qeqwerw	$2b$10$Ggh4U8OPrN1hGEDq1q/ra.6/9cIA2rQ5YLT7migUa/LGgjoV4fFmW	2023-05-22 13:14:14.954971	2023-05-22 13:14:14.954971	\N
64	qeqwerw	$2b$10$mss5q10Va7HqiNHRzQ0NEubWM7Ln2KtHACRlAo1JUUQFCmq16TeTO	2023-05-22 13:14:15.15685	2023-05-22 13:14:15.15685	\N
65	qeqwerw	$2b$10$blGRXFo49YBMVwLsACN2A.q0jMJGJ2mYETG0VG61.4fGgOGR4uUs6	2023-05-22 13:14:17.983961	2023-05-22 13:14:17.983961	\N
66	qeqwerw	$2b$10$C2NXuyHEA/P1VPE3FK3Up.hoiiTU4BrfHaUBthNxYLTwQuGXxIOCm	2023-05-22 13:14:18.166738	2023-05-22 13:14:18.166738	\N
67	qeqwerw	$2b$10$egwR1VDOeJ6ma3Jiw2IDZ.EZCON4eHc9Fr4W8sUVr2snCMiFt4nkS	2023-05-22 13:14:18.347983	2023-05-22 13:14:18.347983	\N
68	qeqwerw	$2b$10$TjeWwJhsTtGtqFtmlhX0feTXykihCHrJPo5MD3C82fqcVDsXtGojK	2023-05-22 13:15:05.945238	2023-05-22 13:15:05.945238	\N
69	qeqwerw	$2b$10$daxZKZTSKpxVDNDglvdUEeXEx5nquZ6YawYALVuCVd3pBih6l9NYK	2023-05-22 13:15:06.960611	2023-05-22 13:15:06.960611	\N
70	qeqwerw	$2b$10$ALgav7ln2KwkIoVnfKKUNO083RGvonc5fkEX/pg.FhRBOfuyq97Oi	2023-05-22 13:15:07.095933	2023-05-22 13:15:07.095933	\N
71	qeqwerw	$2b$10$GwWEePDbppVBiIwAL0Yn1eDdjNwo646QNyBvkM0yXY5m5PD9c3d.u	2023-05-22 13:15:07.234194	2023-05-22 13:15:07.234194	\N
75	zubair5	$2b$10$VD2.zQ3k91/dIKDCZtjHiOsJIfsdw8JAiR3.p3hK.CQeNg7E.EZKa	2023-05-22 13:51:58.184297	2023-05-22 13:51:58.184297	\N
76	popoppopo	$2b$10$24l36TQYSSossNTFHYS/E.MnZtUBMuT3vRFxdRq4tr35nCWImdGtm	2023-05-22 14:00:16.228805	2023-05-22 14:00:16.228805	\N
77	weoiewjrioejo	$2b$10$vJrY9Wx5elPF6S/EHLL4cevL53an/hINneUW20Ex/GFmHhtVgMthq	2023-05-22 14:00:55.408856	2023-05-22 14:00:55.408856	\N
79	kijang	$2b$10$dNk07DEstW0WRy/mpazPJ.cNI5RJUPADe9CyjbQeDiaPbaIkVQnJK	2023-05-22 14:08:45.244066	2023-05-22 14:08:45.244066	\N
80	zubair123456	$2b$10$Hs5svklo0UQ7xQTAGeromOpGaTNWH/mtpU9VmBncauy.YRtBO5oSm	2023-05-23 04:48:25.14532	2023-05-23 04:48:25.14532	\N
81	abujahal	$2b$10$1yXyVuRTiPFxmM20hJRu5uG3iPqzZVA9WfH/YRBtORd3z3sIOEYPm	2023-05-23 08:10:21.409828	2023-05-23 08:10:21.409828	\N
15	cobaUpdate	$2b$10$PnckRPd7kTFFTap1xZeVYeVlyGCntxJKEicI5ZHv2D3WatjlDbnaq	2023-05-04 02:42:25.134448	2023-05-04 02:42:25.134448	\N
78	abujahalupdated34	$2b$10$yWAtzT6er6pjB3mWoeQ8UuNzX7NMTxwkmk.bXImnH7foFrei75AiK	2023-05-22 14:03:37.331184	2023-05-22 14:03:37.331184	\N
85	abuhakam	$2b$10$SWnr5KPWG/luwJNshhs5puDx27da7PLwH6Hwgi1TEM1vsciVPcDMi	2023-05-26 08:23:52.181778	2023-05-26 08:23:52.181778	\N
16	coba-update	$2b$10$ohkqiPaSBIsM4e4IqaFuhOp7.QYpr2Vahl45g2XpCrJ53bbAfiMRq	2023-05-04 02:42:42.934319	2023-05-04 02:42:42.934319	\N
83	cobainibro	$2b$10$jcUuu8XEyCLA3uYC10GPXehQXV1u2n60uC54uhKIhAAqCWsvXmXQa	2023-05-25 13:04:28.285873	2023-05-25 13:04:28.285873	\N
82	bagasupdated	$2b$10$ATW6DspXd19.85j.w8zJ8OlTBtDI134m6ufhiCsPGMSKlJ.97QMP6	2023-05-25 12:59:40.185603	2023-05-25 12:59:40.185603	\N
84	utbah123updated123456	$2b$10$pa4j6eNhy2eYu58JviYYDuXBXW16EoMSMcEvngeMhj25K8i2pMTfC	2023-05-26 07:47:46.082566	2023-05-26 07:47:46.082566	\N
\.


--
-- Name: customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customer_id_seq', 82, true);


--
-- Name: order_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_detail_id_seq', 9, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 7, true);


--
-- Name: product_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_category_id_seq', 10, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 53, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 85, true);


--
-- Name: customer customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (id);


--
-- Name: order_detail order_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT order_detail_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: product_category product_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_category
    ADD CONSTRAINT product_category_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: customer customer_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: order_detail order_detail_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT order_detail_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: order_detail order_detail_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT order_detail_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: product product_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.product_category(id);


--
-- PostgreSQL database dump complete
--

