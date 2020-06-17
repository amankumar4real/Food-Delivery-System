import React from "react";
import styles from "../css/footer.module.css";
// import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import { faGitSquare, faLinkedin, faHackerrank} from '@fortawesome/free-brands-svg-icons';


const Footers = () => {
    return(
        <div class="row">
            <div className={styles.footer}>
                <div class="text-center mt-1">
                    {/* <a href="https://github.com/amankumar4real" target="_blank"><FontAwesomeIcon className="mr-2" size="2x" icon={faGitSquare}/></a>
                    <a href="https://www.hackerrank.com/amankumar4real" target="_blank"><FontAwesomeIcon className="mr-2" size="2x" className="mr-1" icon={faHackerrank}/></a>
                    <a href="https://www.linkedin.com/in/amankumar4real/" target="_blank"><FontAwesomeIcon className="mr-2" size="2x" icon={faLinkedin}/></a> */}
                </div>
                <div class="footer-copyright text-center py-3 text-secondary">
                    © 2020 Copyright:
                </div>
            </div>
        </div>
    )
}

export default Footers;
