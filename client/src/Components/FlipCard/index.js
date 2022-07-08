import React from "react";
import styles from "./index.module.scss";
import { gsap } from "gsap";


class FlipCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card: {
                frontContent: null,
                frontBackground: null,
                backContent: null,
                flipIcon: null,
                wiggled: false,
                cards: [],
            },
        };
    }
    componentDidMount() {
        this.setState({cards: document.querySelectorAll('.flip-cards .card')});
        var ua = navigator.userAgent.toLowerCase(); 
        if (ua.indexOf('safari') != -1) { 
        if (ua.indexOf('chrome') > -1) {
        } else {
            this.state.cards.forEach((card) => {
                card.classList.add('is-safari');
            })   
        }
        }
        
        if (this.state.cards.length>0) {
            window.addEventListener('load', () => {
                this.wiggle();
            })
            window.addEventListener('scroll', () => {
                this.wiggle();
            })
        }
        this.setState({wiggled: false});
        this.state.cards.forEach((card) => {
            card.addEventListener('click', () => {
                if(window.lt992) {
                    if(card.parentElement.classList.contains('slick-active') || (card.parentElement.classList.contains('slick-current') && card.parentElement.classList.contains('slick-center'))) {
                        if (card.classList.contains('wiggle')) {
                            card.classList.remove('wiggle');
                        }
                        if (card.classList.contains('flip')) {
                            card.classList.remove('flip');
                        } else {
                            setTimeout(() => {
                                card.classList.add('flip');
                            },200)
                        }
                    }
                } else {
                    if (card.classList.contains('wiggle')) {
                        card.classList.remove('wiggle');
                    }
                    if (card.classList.contains('flip')) {
                        card.classList.remove('flip');
                    } else {
                        setTimeout(() => {
                            card.classList.add('flip');
                        },200)
                    }
                }
            });
        });
    }
    
    wiggle = () => {
        if (this.isInViewport(this.state.cards[0]) && !this.state.wiggled) {
            this.state.cards[0].classList.add('wiggle');
            this.state.setState({wiggled: true});
            setTimeout(function() {
                this.state.cards[0].classList.remove('wiggle');
            }, 1500);
        }
    
    }
    isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    render() {
        return(
            <div class="card-container">
                <div class="card">
                    <div class="card__front" >
                        <img class="background" src={this.state.frontBackground} alt="background" />
                        <p>{this.state.card.frontContent}</p>
                        <img class="card__icon-flip" src={this.state.card.flipIcon} alt="flip icon" />
                    </div>
                    <div class="card__back">
                        <p>{this.state.card.frontContent}</p>
                        <img class="card__icon-flip" src={this.state.card.flipIcon} alt="flip icon" />
                    </div>
                </div>
            </div>
        )
    }
}

export default FlipCard;