import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { TwitterShareButton } from "react-share";
import { Link } from "react-router-dom";

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	h2 {
		font-size: 50px;
	}
	p {
		width: 900px;
		text-align: center;
	}

	h3 {
		font-size: 30px;
	}
`;

const Input = styled.input`
	height: 40px;
	width: 400px;
	padding-left: 10px;
`;

const Card = styled.div`
	height: 270px;
	width: 300px;
	border: 1px solid gray;
	border-radius: 5px;
`;

const CardHold = styled.div`
	padding-left: 20px;
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	justify-content: center;
	align-items: center;
`;

const NewsCat = styled.div`
	font-size: 40px;
	font-weight: bold;
	display: flex;
	gap: 20px;
`;

const NewsCard = styled.div`
	height: 150px;
	width: 300px;
	border: 1px solid gray;
	border-radius: 5px;

	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const NewsImage = styled.img`
	height: 100px;
	width: 100%;
	object-fit: cover;
`;
//
interface PropsData {
	content: string;
	title: string;
	description: string;
	image: string;
	url: string;
	publishedAt: string;
	source: {
		name: string;
		url: string;
	};
}

const HomePage = () => {
	const [NewsData, setNewsData] = useState([]);
	const [search, setSearch] = useState("");
	const apikey = "2ed33d03f6cefa17aa74e858c895fce8";
	const url = `https://gnews.io/api/v4/search?q=${search}&lang=en&country=us&max=10&apikey=${apikey}`;

	const GetNewsQuery = async () => {
		try {
			await axios
				.get(url)
				.then((response) => {
					console.log(response?.data?.articles);
				
					localStorage.setItem(
						"newsData",
						JSON.stringify(response?.data?.articles),
					);
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (err) {
			console.log(err);
		}
	};


     useEffect(() => {
				const retrieveData = JSON.parse(localStorage.getItem("newsData") || "");
				console.log("retrie", retrieveData);

                setNewsData(retrieveData)
				
			}, []);

	return (
		<Container>
			<h2>NEWS AGGREGATOR KODE10X</h2>

			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor sed
				quibusdam error, voluptas quas quaerat sequi enim eos tempore porro
				voluptatum quis amet veritatis deserunt? Repellat quibusdam nobis optio
				facere, vitae facilis quo repellendus, nostrum numquam voluptas commodi
				at libero hic ipsum eligendi velit nemo repudiandae. Fuga dolorum minima
				quibusdam.
			</p>

			<Input
				onChange={(e) => {
					setSearch(e.target.value);
				}}
				placeholder='Search for news'
			/>

			<button onClick={GetNewsQuery}>Search</button>
			<br />
			<br />
			<h3>Our Differnent news source</h3>

			<NewsCat>
				<NewsCard>BBC</NewsCard>
				<NewsCard>Google</NewsCard>
				<NewsCard>BING</NewsCard>
				<NewsCard>PUNCH</NewsCard>
			</NewsCat>

			<br />
			<br />
			<br />

			<h3>Current News Headlines</h3>
			<CardHold>
				{NewsData?.map((props: PropsData, i: number) => (
					<Card key={i}>
						<NewsImage src={props.image} />
						<div>{props?.title}</div>
						<Link to={`/detailed/${i}`}>
							<div>Read More</div>
						</Link>
						<TwitterShareButton content='news for today' url={props?.url}>
							share
						</TwitterShareButton>
					</Card>
				))}
			</CardHold>
		</Container>
	);
};

export default HomePage;
