var React = require('react');

HerStory = React.createClass({

  render: function () {
    return (
      <div>
        <section className="main-section dark-section order" id="welcome">
          <div className="container">
            <header className="section-header">
              <h2>Zo&#235;'s Story</h2>
              <div className="divider-section-header"></div>
              <p className="text-left">Zoe looks like a healthy girl. She is extremely active – ripsticking, catching frogs, jumping on the trampoline, swimming, and
              playing with her friends. However, at the age of five, she was diagnosed with Type I Diabetes. In order to stay healthy,
              she must carefully monitor her glucose levels. This involves several finger pricks a day and the wearing of a Continuous
              Glucose Monitor (CGM). Before every meal, her parents carefully estimate the number of carbohydrates she is about to consume
              and inject insulin into her before she eats.</p>
              <br/>
              <p className="text-left">For most people, the constant finger pricks and injections would get them down. Luckily, Zoe has shown an
              amazingly positive attitude and takes it all in stride. Even though she is young, she knows the monitoring and injections are what keeps her healthy and alive.
              This is not to say that she doesn’t have moments when she wishes she was not a diabetic and could just grab a
              snack without checking her glucose and getting a shot. Her dad lamented the lack of low carb ice cream available and
              decided that they could make their own ice cream that would not require an insulin injection.</p>
              <br/>
              <p className="text-left">This is not to say that the ice cream is healthy. Its main components are whole milk, heavy cream, vanilla
              extract, and sucralose (commonly marketed as Splenda). This is a special, occasional treat that, while low
              in carbs, is high in calories. In small quantities, it is a welcome break from the constant monitoring required with diabetes.</p>
              <br/>
              <p className="text-left">Over the last century, there have been many advances in diabetes research resulting in a significantly
              prolonged life expectancy and more manageable treatments. While her family is grateful for the progress,
              there are many promising advances that will help Zoe have a more normal life free of worry about glucose levels
              and injections. Her parents decided that making, packaging, and marketing the ice cream she enjoys would be
              a great way to get her involved in fund raising for a great cause. All materials to make and package the ice
              cream are donated by her parents. 100% of the money collected is donated to the Juvenile Diabetes Research Fund.</p>
              <br/>
              <p className="text-left">There is a certain irony in fund raising to research advances in Type I diabetes treatment with a product
              that may lead to Type II diabetes. We cannot emphasize enough; ice cream is not health food. It is an occasional treat.
              Anything that leads to a conversation about diabetes and promotes awareness of both Type I and Type II is helpful.</p>
            </header>
          </div>
        </section>
      </div>
    );
  }
});

module.exports = HerStory;
