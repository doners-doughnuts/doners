package com.doners.donersbackend.domain.repository.epilogue;

import com.doners.donersbackend.domain.dao.epilogue.Epilogue;
import com.doners.donersbackend.domain.dao.user.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EpilogueRepository extends JpaRepository<Epilogue,String> {
    Optional<Epilogue> findByIdAndEpilogueIsDeleted(String epilogueId, boolean isDeleted);
    Optional<List<Epilogue>> findByEpilogueIsDeletedOrderByEpilogueCreateTimeDesc(boolean isDeleted, Pageable pageable);
    Optional<List<Epilogue>> findByEpilogueIsDeleted(boolean isDeleted);
    Optional<List<Epilogue>> findByUserAndEpilogueIsDeletedOrderByEpilogueCreateTimeDesc(User user, boolean isDeleted);
}
