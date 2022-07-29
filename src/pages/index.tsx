import {
    Container,
    Greetings,
    Progress,
    StoreDestinations,
} from "@/components";

const Home = () => {
    return (
        <Container title="Home" className="max-w-md mx-auto">
            <Greetings />
            <Progress />
            <StoreDestinations />
            {/* temp quote */}
            <div className="my-5">
                <img
                    src="/images/illustration/on-the-way.svg"
                    alt="on the way"
                />
                <blockquote className="mt-6 text-xl font-medium dark:text-slate-100">
                    &ldquo;Approach each customer with the idea of helping them
                    to solve a problem or achieve a goal, not of selling a
                    product or service&rdquo;
                    <br /> <span className="text-teal-500">- Brian Tracy</span>
                </blockquote>
            </div>
        </Container>
    );
};

export default Home;
