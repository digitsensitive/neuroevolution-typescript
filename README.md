# Neuroevolution in Typescript

&nbsp;&nbsp;
[![GitHub issues](https://img.shields.io/github/issues/digitsensitive/neuroevolution-typescript.svg)](https://github.com/digitsensitive/neuroevolution-typescript/issues)
[![GitHub stars](https://img.shields.io/github/stars/digitsensitive/neuroevolution-typescript.svg)](https://github.com/digitsensitive/neuroevolution-typescript/stargazers)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)
[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![GitHub license](https://img.shields.io/github/license/digitsensitive/neuroevolution-typescript.svg)](https://github.com/digitsensitive/neuroevolution-typescript)

## Neuroevolution

Neuroevolution, or neuro-evolution, is a form of machine learning that uses evolutionary algorithms to train artificial neural networks.
It is most commonly applied in artificial life, computer games, and evolutionary robotics. A main benefit is that neuroevolution can be applied more
widely than supervised learning algorithms, which require a syllabus of correct input-output pairs. In contrast, neuroevolution requires only a measure
of a network's performance at a task. For example, the outcome of a game (i.e. whether one player won or lost) can be easily measured without providing
labeled examples of desired strategies.

## Motivation

This library has been greatly influenced by [xviniette](https://github.com/xviniette/FlappyLearning).
My motivation was to rewrite it in TypeScript.

## Usage

`import Neuroevolution from 'neuroevolution-typescript';`

## Configuration

```ts
interface INeuroevolutionConfig {

    // Perceptron network structure (1 hidden // layer).
    // Default: [1, [1], 1]
    network?: [number, number[], number];
    
    // Population by generation.
    // Default: 50
    population?: number;
    
    // Best networks kepts unchanged for the next generation (rate).
    // Default: 0.2
    elitism?: number;
    
    // New random networks for the next generation (rate).
    // Default: 0.2
    randomBehaviour?: number;
    
    // Mutation rate on the weights of synapses.
    // Default: 0.1
    mutationRate?: number;
    
    // Interval of the mutation changes on the synapse weight
    // Default: 0.5
    mutationRange?: number;
    
    // Latest generations saved.
    // Default: 0
    historic?: number;
    
    // Only save score (not the network).
    // Default: false
    lowHistoric?: boolean;
    
    // Sort order (-1 = desc, 1 = asc).
    // Default: -1
    scoreSort?: number;
    
    // Number of children by breeding.
    // Default: 1
    nbChild?: number;
}
```

## Ressources

[Deep Neuroevolution: Genetic Algorithms are a Competitive Alternative for
Training Deep Neural Networks for Reinforcement Learning](https://arxiv.org/pdf/1712.06567.pdf)  

## Changelog

[Learn about the latest improvements](https://github.com/digitsensitive/neuroevolution-typescript/blob/master/CHANGELOG.md)

## Contributing

Want to correct a bug, contribute some code, or improve the codes? Excellent! Let me know!
Please read [CONTRIBUTING.md](https://github.com/digitsensitive/neuroevolution-typescript/blob/master/CONTRIBUTING.md) for details on our code of conduct.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/digitsensitive/neuroevolution-typescript/blob/master/LICENSE) file for details.
